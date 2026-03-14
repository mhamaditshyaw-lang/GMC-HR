import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { month, employee_id, status } = req.query;
    let query = `
      SELECT p.*, e.name AS employee_name, e.job_title AS role, e.avatar
      FROM payroll p
      JOIN employees e ON p.employee_id = e.id
      WHERE 1=1
    `;
    const params: any[] = [];
    if (month) { params.push(month); query += ` AND p.month=$${params.length}`; }
    if (employee_id) { params.push(employee_id); query += ` AND p.employee_id=$${params.length}`; }
    if (status) { params.push(status); query += ` AND p.status=$${params.length}`; }
    query += ' ORDER BY p.created_at DESC';
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payroll' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { employee_id, month, base_salary, bonus, deductions, net_salary, status } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO payroll (employee_id, month, base_salary, bonus, deductions, net_salary, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [employee_id, month, base_salary, bonus || 0, deductions || 0, net_salary, status || 'Pending']
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create payroll entry' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { base_salary, bonus, deductions, net_salary, status } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE payroll SET base_salary=$1, bonus=$2, deductions=$3, net_salary=$4, status=$5
       WHERE id=$6 RETURNING *`,
      [base_salary, bonus, deductions, net_salary, status, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Payroll entry not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payroll' });
  }
});

router.get('/adjustments', async (req: Request, res: Response) => {
  try {
    const { employee_id } = req.query;
    let query = `SELECT pa.*, e.name AS employee_name FROM payroll_adjustments pa JOIN employees e ON pa.employee_id = e.id WHERE 1=1`;
    const params: any[] = [];
    if (employee_id) { params.push(employee_id); query += ` AND pa.employee_id=$${params.length}`; }
    query += ' ORDER BY pa.created_at DESC';
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch adjustments' });
  }
});

router.post('/adjustments', async (req: Request, res: Response) => {
  const { employee_id, adjustment_type, label, amount, percent, frequency, effective_date } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO payroll_adjustments (employee_id, adjustment_type, label, amount, percent, frequency, effective_date)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [employee_id, adjustment_type, label, amount, percent, frequency || 'Monthly', effective_date]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create adjustment' });
  }
});

router.delete('/adjustments/:id', async (req: Request, res: Response) => {
  try {
    await pool.query('DELETE FROM payroll_adjustments WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete adjustment' });
  }
});

export default router;
