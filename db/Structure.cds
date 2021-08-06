namespace myCompany.hr;



entity UsersEntity{
    Key ID: Integer;
    name: String(20) ;
    second_name: String(30);
    email : String(50) ;
    user_creation_date: String;
    expense: Association to many ExpensesEntity on expense.user = $self;


};

entity ExpensesEntity {
    Key ID:Integer;
    comida:  Integer not null;
    transporte_hotel: Integer not null;
    dineroPagado:Integer not null;
    user: Association to UsersEntity;
    ingreso_total : Integer;
    gasto_total: Integer;
    balance: Integer;
    balanceT:String;

    
    };


