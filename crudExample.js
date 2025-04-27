const pool = require('./db');

async function basicCrud() {
  let conn;
  try {
    conn = await pool.getConnection();

    // 檢查學號是否存在的函式
    async function checkStudentIDExist(studentID) {
      const result = await conn.query('SELECT * FROM Students WHERE StudentID = ?', [studentID]);
      return result.length > 0;
    }

    // 1. INSERT 新增（檢查學號是否存在）
    let studentID = '20230021';
    let studentName = 'Tom Green';
    let grade = 'Freshman';

    const exists = await checkStudentIDExist(studentID);
    if (exists) {
      console.log(`學號 ${studentID} 已存在，無法新增`);
    } else {
      let sql = 'INSERT INTO Students (StudentID, Name, Grade) VALUES (?, ?, ?)';
      await conn.query(sql, [studentID, studentName, grade]);
      console.log('已新增一筆學生資料');
    }

    // 2. SELECT 查詢
    let sql = 'SELECT * FROM Students WHERE Grade = ?';
    const rows = await conn.query(sql, ['Freshman']);
    console.log('查詢結果：', rows);

    // 3. UPDATE 更新（檢查學號是否存在）
    studentID = '20230021';  // 更新用的學號
    let newName = 'Tommy Green';

    const existsToUpdate = await checkStudentIDExist(studentID);
    if (existsToUpdate) {
      sql = 'UPDATE Students SET Name = ? WHERE StudentID = ?';
      await conn.query(sql, [newName, studentID]);
      console.log('已更新學生名稱');
    } else {
      console.log(`學號 ${studentID} 不存在，無法更新`);
    }

    // 4. DELETE 刪除（檢查學號是否存在）
    studentID = '20230021';  // 刪除用的學號

    const existsToDelete = await checkStudentIDExist(studentID);
    if (existsToDelete) {
      sql = 'DELETE FROM Students WHERE StudentID = ?';
      await conn.query(sql, [studentID]);
      console.log('已刪除該學生');
    } else {
      console.log(`學號 ${studentID} 不存在，無法刪除`);
    }

  } catch (err) {
    console.error('操作失敗：', err);
  } finally {
    if (conn) conn.release();
  }
}

basicCrud();
