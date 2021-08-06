using { myCompany.hr as hr } from '../db/Structure';

@path:'/browse'
service logicUsers{
    entity Expense as projection on hr.ExpensesEntity;
    entity User as projection on hr.UsersEntity;


}

