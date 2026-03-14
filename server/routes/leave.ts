import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { employee_id, status } = req.query;
    let query = `
      SELECT l.*, e.avatar
      FROM leave_requests l
      JOIN employees e ON l.employee_id = e.id
      WHERE 1=1
    `;
    const params: any[] = [];
    if (employee_id) { params.push(employee_id); query += ` AND l.employee_id=$${params.length}`; }
    if (status) { params.push(status); query += ` AND l.status=$${params.length}`; }
    query += ' ORDER BY l.created_at DESC';
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leave requests' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { employee_id, employee_name, leave_type, start_date, end_date, reason } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO leave_requests (employee_id, employee_name, leave_type, start_date, end_date, reason)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [employee_id, employee_name, leave_type, start_date, end_date, reason]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create leave request' });
  }
});

router.patch('/:id/status', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['Approved', 'Rejected', 'Pending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  try {
    const { rows } = await pool.query(
      `UPDATE leave_requests SET status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Leave request not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update leave status' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await pool.query('DELETE FROM leave_requests WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete leave request' });
  }
});

export default router;
