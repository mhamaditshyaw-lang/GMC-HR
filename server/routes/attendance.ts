import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { employee_id, status, date } = req.query;
    let query = `
      SELECT a.*, e.name AS employee_name, e.avatar, d.name AS department_name
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      LEFT JOIN departments d ON e.department_id = d.id
      WHERE 1=1
    `;
    const params: any[] = [];
    if (employee_id) { params.push(employee_id); query += ` AND a.employee_id=$${params.length}`; }
    if (status) { params.push(status); query += ` AND a.status=$${params.length}`; }
    if (date) { params.push(date); query += ` AND a.date=$${params.length}`; }
    query += ' ORDER BY a.date DESC';
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { employee_id, date, day_of_week, check_in, check_out, hours, status, shift_type } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO attendance (employee_id, date, day_of_week, check_in, check_out, hours, status, shift_type)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [employee_id, date, day_of_week, check_in, check_out, hours, status, shift_type || 'day']
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to record attendance' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { check_in, check_out, hours, status } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE attendance SET check_in=$1, check_out=$2, hours=$3, status=$4 WHERE id=$5 RETURNING *`,
      [check_in, check_out, hours, status, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Record not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update attendance' });
  }
});

router.get('/stats', async (req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { rows } = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE status='On Time') AS on_time,
        COUNT(*) FILTER (WHERE status='Late') AS late,
        COUNT(*) FILTER (WHERE status='Absent') AS absent,
        COUNT(*) FILTER (WHERE status='Early Leave') AS early_leave
      FROM attendance WHERE date=$1
    `, [today]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
