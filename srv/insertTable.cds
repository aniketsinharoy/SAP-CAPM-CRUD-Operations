using myCompany.hr.lms from '../db/Students';

service  insertStudents @(path: '/insertTables'){
   @insertonly entity insertStudent as projection on lms.Students;
}