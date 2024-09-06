const materialType = ['Article', 'Booklet', 'Conference Paper', 'Dissertation', 'Editorial', 'Magazine', 'Newspaper', 'Research Paper', 'Report', 'Thesis', 'Unpublished Work' , 'cd' , 'Novel' , 'ReasearchPaper', 'other'];

const managementType = ['administrator' , 'librarian' , 'teacher' ,'admin','other'];

const managementBookAllocationCount = [
 { 'administrator' : 15} , 
  {'librarian' : 7} , 
  {'teacher' : 10} ,
  {'admin' : 30},
  {'other' : 1}
];


const departmentTagType = ["bsh" , "cse" , "eace"];

const otpTypes = ["invalid", "used", "expired"];

export {
  materialType,
  managementType,
  managementBookAllocationCount,
  departmentTagType,
  otpTypes,
  
};