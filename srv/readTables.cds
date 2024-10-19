using myCompany.hr.lms from '../db/Students';

service  readTables{
   @readonly entity StudentDB as projection on lms.Students;
   @readonly entity StudentDbUseWhereClause as projection on lms.Students;
   @readonly entity StudentDbUseWhereClauseFromURL as projection on lms.Students;
   @readonly entity StudentDbUsingLimit as projection on lms.Students;
   @readonly entity StudentDbUseWhereFirstNameJohn as projection on lms.Students;
}