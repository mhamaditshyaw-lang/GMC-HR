import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/stats', async (req: Request, res: Response) => {
  try {
    const [empResult, deptResult, leaveResult, attendResult] = await Promise.all([
      pool.query(`SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE status='Active') AS active FROM employees`),
      pool.query(`SELECT COUNT(*) AS total FROM departments`),
      pool.query(`SELECT COUNT(*) FILTER (WHERE status='Pending') AS pending FROM leave_requests`),
      pool.query(`
        SELECT
          COUNT(*) FILTER (WHERE status='On Time') AS on_time,
          COUNT(*) FILTER (WHERE status='Late') AS late,
          COUNT(*) FILTER (WHERE status='Absent') AS absent
        FROM attendance WHERE date=CURRENT_DATE
      `)
    ]);

    res.json({
      total_employees: parseInt(empResult.rows[0].total),
      active_employees: parseInt(empResult.rows[0].active),
      total_departments: parseInt(deptResult.rows[0].total),
      pending_leaves: parseInt(leaveResult.rows[0].pending),
      attendance_today: attendResult.rows[0]
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;
