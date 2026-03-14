import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db';
import departmentsRouter from './routes/departments';
import employeesRouter from './routes/employees';
import attendanceRouter from './routes/attendance';
import leaveRouter from './routes/leave';
import payrollRouter from './routes/payroll';
import dashboardRouter from './routes/dashboard';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = parseInt(process.env.PORT || '3001');

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/departments', departmentsRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/payroll', payrollRouter);
app.use('/api/dashboard', dashboardRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function start() {
  try {
    await initDb();
    console.log('Database initialized successfully');
    app.listen(PORT, 'localhost', () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
