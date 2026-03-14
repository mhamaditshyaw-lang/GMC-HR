import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { department_id, status, search } = req.query;
    let query = `
      SELECT e.*, d.name AS department_name
      FROM employees e
      LEFT JOIN departments d ON e.department_id = d.id
      WHERE 1=1
    `;
    const params: any[] = [];
    if (department_id) { params.push(department_id); query += ` AND e.department_id=$${params.length}`; }
    if (status) { params.push(status); query += ` AND e.status=$${params.length}`; }
    if (search) { params.push(`%${search}%`); query += ` AND (e.name ILIKE $${params.length} OR e.email ILIKE $${params.length} OR e.job_title ILIKE $${params.length})`; }
    query += ' ORDER BY e.name';
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      `SELECT e.*, d.name AS department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id WHERE e.id=$1`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { name, email, role, department_id, job_title, employment_type, status, experience_years,
          base_salary, phone, address, gender, employee_id, joining_date, license_number,
          issuing_authority, license_expiry_date, avatar, user_role } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO employees (name, email, role, department_id, job_title, employment_type, status, experience_years,
        base_salary, phone, address, gender, employee_id, joining_date, license_number, issuing_authority,
        license_expiry_date, avatar, user_role)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING *`,
      [name, email, role, department_id, job_title, employment_type || 'full-time', status || 'Active',
       experience_years || 0, base_salary || 0, phone, address, gender, employee_id, joining_date,
       license_number, issuing_authority, license_expiry_date, avatar, user_role || 'STAFF']
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    if (err.code === '23505') return res.status(409).json({ error: 'Employee with this email or ID already exists' });
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, role, department_id, job_title, employment_type, status, experience_years,
          base_salary, phone, address, gender, employee_id, joining_date, license_number,
          issuing_authority, license_expiry_date, avatar, user_role } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE employees SET name=$1, email=$2, role=$3, department_id=$4, job_title=$5, employment_type=$6,
        status=$7, experience_years=$8, base_salary=$9, phone=$10, address=$11, gender=$12,
        employee_id=$13, joining_date=$14, license_number=$15, issuing_authority=$16,
        license_expiry_date=$17, avatar=$18, user_role=$19 WHERE id=$20 RETURNING *`,
      [name, email, role, department_id, job_title, employment_type, status, experience_years,
       base_salary, phone, address, gender, employee_id, joining_date, license_number,
       issuing_authority, license_expiry_date, avatar, user_role, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await pool.query('DELETE FROM employees WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

export default router;
