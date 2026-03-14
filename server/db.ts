import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false },
});

export async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        head VARCHAR(100),
        staff_count INTEGER DEFAULT 0,
        occupancy INTEGER DEFAULT 0,
        budget VARCHAR(20),
        icon_name VARCHAR(50) DEFAULT 'Building2',
        color VARCHAR(20) DEFAULT '#2b7cee',
        avatar TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        role VARCHAR(100),
        department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
        job_title VARCHAR(100),
        employment_type VARCHAR(50) DEFAULT 'full-time',
        status VARCHAR(50) DEFAULT 'Active',
        experience_years INTEGER DEFAULT 0,
        base_salary NUMERIC(12,2) DEFAULT 0,
        phone VARCHAR(30),
        address TEXT,
        gender VARCHAR(20),
        employee_id VARCHAR(30) UNIQUE,
        joining_date DATE,
        license_number VARCHAR(100),
        issuing_authority VARCHAR(100),
        license_expiry_date DATE,
        avatar TEXT,
        user_role VARCHAR(50) DEFAULT 'STAFF',
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS attendance (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        day_of_week VARCHAR(20),
        check_in VARCHAR(20),
        check_out VARCHAR(20),
        hours VARCHAR(20),
        status VARCHAR(50),
        shift_type VARCHAR(50) DEFAULT 'day',
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS leave_requests (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
        employee_name VARCHAR(100),
        leave_type VARCHAR(50),
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        status VARCHAR(20) DEFAULT 'Pending',
        reason TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS payroll (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
        month VARCHAR(30),
        base_salary NUMERIC(12,2),
        bonus NUMERIC(12,2) DEFAULT 0,
        deductions NUMERIC(12,2) DEFAULT 0,
        net_salary NUMERIC(12,2),
        status VARCHAR(30) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS payroll_adjustments (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
        adjustment_type VARCHAR(30) NOT NULL,
        label VARCHAR(100),
        amount NUMERIC(12,2),
        percent NUMERIC(6,2),
        frequency VARCHAR(30) DEFAULT 'Monthly',
        effective_date DATE,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS shifts (
        id SERIAL PRIMARY KEY,
        employee_id INTEGER REFERENCES employees(id) ON DELETE CASCADE,
        shift_date DATE NOT NULL,
        shift_type VARCHAR(30),
        department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    const { rows } = await client.query('SELECT COUNT(*) FROM departments');
    if (parseInt(rows[0].count) === 0) {
      await seedData(client);
    }
  } finally {
    client.release();
  }
}

async function seedData(client: any) {
  await client.query(`
    INSERT INTO departments (name, head, staff_count, occupancy, budget, icon_name, color, avatar) VALUES
    ('Cardiology', 'Dr. Sarah Jenkins', 42, 85, '$1.2M', 'Heart', '#ef4444',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNLMrA2Q9GJBVI25Q-V8ng9tKE_BEWHIvBZHPkFfOXjnOi_DCs_Oj1KFHUHPHgTM8wm_dFOxEo671sX9WVbR6Jt-xAu69SumW9Vo3_M93d0sSbKjB18K61rICj0PPneoRA1hxgCJRvFCDlwa366dky83qo5v9yzEpMOC8AdgSlPbVZVC74ksSEez9QgVplJBSQiqVkY7RFDVbyTMNI94CFuzDYo6FQtr9v-41nf9Zw77_Bb2Rejb-rRw5HVGPxPh8olocGpfx4SF8'),
    ('Neurology', 'Dr. Linda Kim', 28, 72, '$950K', 'Brain', '#8b5cf6',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDsjCCVVt3rMPxIyGeUqMzTyhvVHWF8N5edEwS1ARC08hOYFDTx3-ljAFDT1Bky6AvSog9mrYkpLXsOvQfRSG2xusEElCmD1ULuBfY7VnXVTTc_4O5A7uwQR4T8gZ6Wm-6tR7NC3svMb6rSfJphYLBUwR90nmDg6I5MfVSlm0m-GSM2CZ984NgWQjlHt-HmEQwtTHSpUpVgIsJj4ojvKRdhPze73QwvxHWp9Z9H9_sIapMUL2VXklLCKazbUA8JEa7B5icXwDDp-HA'),
    ('Pediatrics', 'Dr. Marcus Ray', 35, 94, '$820K', 'Baby', '#f59e0b',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBXGTXuSXu64yRsCq5WNHf1b-jXHbAEOyfQUh7YLvqRCzLiomW9i8NNT5fN7Cb2JDD1JsTgDEoX0cH8CzQ9Jq1U2gPF7yOFBsA1wAwgPmcasofj3wB_OL7MHmHYzs-TnBBhOZGOG33Ln4j0FR_aAqW1eob2WVNJbNwPTW961AutFOGPpQf3X10huxvPLasGhk70xDFoOI7OJUHDZz-Tjh5g1IJcu5_dwxslSkNjKVJ-XxjxRoJRn6YMzD5khKu3oa-Zu3ZXydpR7i4'),
    ('Emergency', 'Dr. James Lee', 56, 98, '$2.1M', 'Activity', '#ef4444',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLo-uE5TQiX4CEGqdd7qnwz6NDEoTwCSSDAK9S3rS60llQRCPKEpjBHJVmqSszMDEITfRjZfqrSXmz_FKy4j4R0h5Vyomo1QgpSi_uW7eLf0k7Qt_nBy9jzDo9OCKDE0XQRK4gdcgxMCmmzqGbGasi_21Z7kUL7cagKB-Razght0kN45hPxFBgVOeX__HZnIXEdCscy_UAndP-8Ph_bRUhdOleYeCNstQEosWv9lVR5XuEfXuhFinLeKEqKyfuOPmBljWAQY3-K0Q'),
    ('ICU', 'Dr. Lisa Park', 30, 90, '$1.5M', 'Stethoscope', '#2b7cee',
      'https://picsum.photos/seed/lisa/100/100'),
    ('Admin', 'Emily Chen', 20, 60, '$400K', 'Building2', '#64748b',
      'https://picsum.photos/seed/emily/100/100')
    ON CONFLICT DO NOTHING;
  `);

  await client.query(`
    INSERT INTO employees (name, email, role, department_id, job_title, employment_type, status, experience_years, base_salary, phone, address, gender, employee_id, joining_date, license_number, avatar, user_role) VALUES
    ('Dr. Sarah Jenkins', 'sarah.hr@medicore.com', 'Doctor', (SELECT id FROM departments WHERE name='Cardiology'), 'Senior Cardiologist', 'full-time', 'Active', 12, 185000, '+1 (555) 234-8901', '742 Evergreen Terrace, Medical District', 'female', 'EMP-1001', '2012-05-15', 'MED-12345-89', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNLMrA2Q9GJBVI25Q-V8ng9tKE_BEWHIvBZHPkFfOXjnOi_DCs_Oj1KFHUHPHgTM8wm_dFOxEo671sX9WVbR6Jt-xAu69SumW9Vo3_M93d0sSbKjB18K61rICj0PPneoRA1hxgCJRvFCDlwa366dky83qo5v9yzEpMOC8AdgSlPbVZVC74ksSEez9QgVplJBSQiqVkY7RFDVbyTMNI94CFuzDYo6FQtr9v-41nf9Zw77_Bb2Rejb-rRw5HVGPxPh8olocGpfx4SF8', 'HR_MANAGER'),
    ('James Wilson', 'james.wilson@medicore.com', 'Nurse', (SELECT id FROM departments WHERE name='ICU'), 'Registered Nurse', 'full-time', 'On Leave', 4, 75000, '+1 (555) 111-2222', '55 Maple Ave', 'male', 'EMP-1002', '2020-01-10', NULL, 'https://picsum.photos/seed/james/100/100', 'STAFF'),
    ('Emily Chen', 'emily.chen@medicore.com', 'Administrator', (SELECT id FROM departments WHERE name='Admin'), 'Office Administrator', 'full-time', 'Active', 2, 55000, '+1 (555) 333-4444', '99 Oak St', 'female', 'EMP-1003', '2022-03-01', NULL, 'https://picsum.photos/seed/emily/100/100', 'STAFF'),
    ('Dr. Marcus Ray', 'marcus.ray@medicore.com', 'Doctor', (SELECT id FROM departments WHERE name='Pediatrics'), 'Pediatrician', 'part-time', 'Active', 8, 120000, '+1 (555) 555-6666', '12 Pine Rd', 'male', 'EMP-1004', '2016-07-20', 'MED-67890-12', 'https://picsum.photos/seed/marcus/100/100', 'DEPT_HEAD'),
    ('Dr. Linda Kim', 'linda.kim@medicore.com', 'Doctor', (SELECT id FROM departments WHERE name='Neurology'), 'Neurosurgeon', 'full-time', 'Active', 15, 225000, '+1 (555) 777-8888', '300 Birch Blvd', 'female', 'EMP-1005', '2009-09-01', 'MED-11223-45', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsjCCVVt3rMPxIyGeUqMzTyhvVHWF8N5edEwS1ARC08hOYFDTx3-ljAFDT1Bky6AvSog9mrYkpLXsOvQfRSG2xusEElCmD1ULuBfY7VnXVTTc_4O5A7uwQR4T8gZ6Wm-6tR7NC3svMb6rSfJphYLBUwR90nmDg6I5MfVSlm0m-GSM2CZ984NgWQjlHt-HmEQwtTHSpUpVgIsJj4ojvKRdhPze73QwvxHWp9Z9H9_sIapMUL2VXklLCKazbUA8JEa7B5icXwDDp-HA', 'STAFF'),
    ('Robert Fox', 'robert.fox@medicore.com', 'Technician', (SELECT id FROM departments WHERE name='Admin'), 'Lab Technician', 'full-time', 'Suspended', 5, 60000, '+1 (555) 999-0000', '7 Cedar Ct', 'male', 'EMP-1006', '2019-11-15', NULL, 'https://picsum.photos/seed/robert/100/100', 'STAFF'),
    ('Alex Rivera', 'admin@medicore.com', 'Administrator', NULL, 'Super Administrator', 'full-time', 'Active', 8, 150000, '+1 (555) 000-1111', '1 Admin Plaza', 'male', 'EMP-0001', '2016-01-01', NULL, 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9y7evbRG9tVWPoi7S7zwVW51A06Zao1MJIbU1l655XcK-J-cAPO1PWpj6EvqMB7tTAZ5S0hgA0yZfuIy_ARownrlKndSUNcQMerpqV-WeNksg0CXYFZ-ISq0znQbNrCUytV4Qc8V9CiBKzzR2hRAHjUz_5KnThE9By1qLdRUMjhKPrnkigznGlQJfjFxXWS6tAMScOgNy0m8nRPTXHLOEtByi5y2HZwi_fG6r54rGcrrRRbNAkZJXUVGQ74w8SfoakHk8LViDIbE', 'SUPER_ADMIN'),
    ('Dr. James Lee', 'james.lee@medicore.com', 'Doctor', (SELECT id FROM departments WHERE name='Emergency'), 'Anesthesiologist', 'full-time', 'Active', 10, 175000, '+1 (555) 222-3333', '88 Willow Way', 'male', 'EMP-1008', '2014-06-01', 'MED-99887-66', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLo-uE5TQiX4CEGqdd7qnwz6NDEoTwCSSDAK9S3rS60llQRCPKEpjBHJVmqSszMDEITfRjZfqrSXmz_FKy4j4R0h5Vyomo1QgpSi_uW7eLf0k7Qt_nBy9jzDo9OCKDE0XQRK4gdcgxMCmmzqGbGasi_21Z7kUL7cagKB-Razght0kN45hPxFBgVOeX__HZnIXEdCscy_UAndP-8Ph_bRUhdOleYeCNstQEosWv9lVR5XuEfXuhFinLeKEqKyfuOPmBljWAQY3-K0Q', 'DEPT_HEAD'),
    ('Mark Wilson', 'mark.wilson@medicore.com', 'Nurse', (SELECT id FROM departments WHERE name='Emergency'), 'Emergency Nurse', 'full-time', 'Active', 3, 70000, '+1 (555) 444-5555', '14 Elm St', 'male', 'EMP-1009', '2021-02-15', NULL, 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRXTq2HqBx3mfSPgjl-5nNlDh9roLTRij3tKMB8SC3EhQNGGta-gt9LAhD0AdYevWXfMSleS-ZIV1st09emj-6Cwg2MncWwmR8Fjst0EpNxVgo179xwCgQQ_BOBJzHGWLuMaPFOik4fDu0XeThEdeQxwJfgdxADZoBD5yYkxyslPRz37MQzEMJThw8wwaf0Tv7srpVda7k22KjuM3w0iUED3IHiDKSxaCn4QAAwtgt8_TQqVwJa4-DDZNCCtHLZtsWtcDDcFM-Vws', 'STAFF'),
    ('Dr. Emily Chen', 'emily.chen2@medicore.com', 'Doctor', (SELECT id FROM departments WHERE name='Cardiology'), 'Senior Resident', 'full-time', 'Active', 6, 110000, '+1 (555) 666-7777', '21 Spruce Ave', 'female', 'EMP-1010', '2018-08-01', 'MED-44556-78', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxdNJwmk758EkbaL7gBPr64a8wFu5TljQXU9fIYj6h2Iu-wTiWif_yfRurTm1t6wQxU4WufdQUfarzUlT6Z8zTcAXQzokPzYuzaqHQF03KUFHfkNAcy8UiWmDgASp92rgk5-0F7UIYZAEsNkAe9mLT5FCqCrHzOxdFW7A6eGSsV6lUK-BKZmRMIaClNWIKAEQHIi3Qyd5AwOd8EoU4NA19e3Po9mo1V5GMPC8LlXmv7CKz7qs_fKIPCOSVjFe_GhwUC8glk474DTQ', 'STAFF')
    ON CONFLICT DO NOTHING;
  `);

  await client.query(`
    INSERT INTO attendance (employee_id, date, day_of_week, check_in, check_out, hours, status) VALUES
    (1, '2023-10-20', 'Sunday', NULL, NULL, '0h 0m', 'Day Off'),
    (1, '2023-10-21', 'Monday', '06:58 AM', '07:02 PM', '12h 4m', 'On Time'),
    (1, '2023-10-22', 'Tuesday', '07:05 AM', '07:10 PM', '12h 5m', 'Late'),
    (1, '2023-10-23', 'Wednesday', '06:50 AM', '06:55 PM', '12h 5m', 'On Time'),
    (1, '2023-10-24', 'Thursday', '06:55 AM', '07:05 PM', '12h 10m', 'On Time'),
    (1, '2023-10-25', 'Friday', '07:00 AM', '07:00 PM', '12h 0m', 'On Time'),
    (1, '2023-10-26', 'Saturday', '07:10 AM', '03:00 PM', '7h 50m', 'Early Leave'),
    (9, '2023-10-21', 'Monday', '08:02 AM', '04:10 PM', '8h 8m', 'Late'),
    (9, '2023-10-22', 'Tuesday', '07:50 AM', '04:00 PM', '8h 10m', 'On Time'),
    (2, '2023-10-21', 'Monday', NULL, NULL, '0h 0m', 'Absent'),
    (3, '2023-10-21', 'Monday', '09:00 AM', '05:00 PM', '8h 0m', 'On Time')
    ON CONFLICT DO NOTHING;
  `);

  await client.query(`
    INSERT INTO leave_requests (employee_id, employee_name, leave_type, start_date, end_date, status, reason) VALUES
    (1, 'Sarah Jenkins', 'Annual', '2026-03-10', '2026-03-15', 'Approved', 'Family Vacation'),
    (1, 'Sarah Jenkins', 'Sick', '2026-02-01', '2026-02-02', 'Approved', 'Flu'),
    (1, 'Sarah Jenkins', 'Annual', '2026-04-20', '2026-04-22', 'Pending', 'Personal'),
    (9, 'Mark Wilson', 'Sick', '2026-03-05', '2026-03-06', 'Pending', 'Medical appointment')
    ON CONFLICT DO NOTHING;
  `);

  await client.query(`
    INSERT INTO payroll (employee_id, month, base_salary, bonus, deductions, net_salary, status) VALUES
    (1, 'March 2026', 15416, 1200, 3850, 12766, 'Paid'),
    (10, 'March 2026', 9166, 500, 2290, 7376, 'Paid'),
    (9, 'March 2026', 6250, 200, 1560, 4890, 'Pending'),
    (8, 'March 2026', 14583, 1000, 3645, 11938, 'Paid'),
    (5, 'March 2026', 18750, 2500, 4680, 16570, 'Paid'),
    (1, 'February 2026', 15416, 1000, 3850, 12566, 'Paid'),
    (10, 'February 2026', 9166, 500, 2290, 7376, 'Paid'),
    (9, 'February 2026', 6250, 0, 1560, 4690, 'Paid')
    ON CONFLICT DO NOTHING;
  `);

  await client.query(`
    INSERT INTO payroll_adjustments (employee_id, adjustment_type, label, amount, percent, frequency, effective_date) VALUES
    (1, 'bonus', 'Performance Bonus', 1200, NULL, 'One-time', '2026-03-01'),
    (1, 'deduction', 'Health Insurance', 500, NULL, 'Monthly', '2026-01-01'),
    (1, 'increase', 'Annual Raise', 5000, 2.7, 'Yearly', '2026-01-01'),
    (10, 'bonus', 'Residency Completion Bonus', 500, NULL, 'One-time', '2026-03-01'),
    (9, 'deduction', 'Pension', 300, NULL, 'Monthly', '2026-01-01')
    ON CONFLICT DO NOTHING;
  `);
}
