using myCompany.hr.lms from '../db/Students';

service  updateStudents @(path: '/updateTables'){
   @updateonly entity updateStudent as projection on lms.Students;
   @updateonly entity updateStudentWithTransaction as projection on lms.Students;
}