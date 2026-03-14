import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM departments ORDER BY name');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { name, head, staff_count, occupancy, budget, icon_name, color, avatar } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO departments (name, head, staff_count, occupancy, budget, icon_name, color, avatar)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, head, staff_count || 0, occupancy || 0, budget, icon_name || 'Building2', color || '#2b7cee', avatar]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create department' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, head, staff_count, occupancy, budget, icon_name, color, avatar } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE departments SET name=$1, head=$2, staff_count=$3, occupancy=$4, budget=$5, icon_name=$6, color=$7, avatar=$8
       WHERE id=$9 RETURNING *`,
      [name, head, staff_count, occupancy, budget, icon_name, color, avatar, id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Department not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update department' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM departments WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete department' });
  }
});

export default router;
