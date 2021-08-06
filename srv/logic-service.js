const cds = require("@sap/cds");
const {ExpensesEntity} = cds.entities('myCompany.hr');



module.exports = cds.service.impl(srv =>{
    srv.on('CREATE',"Expense",_totalBalance)
    

});

async function _totalBalance  (req){
    const parentId = req.data.user_ID;
    const Comida = req.data.comida ;
    const transporteHotel = req.data.transporte_hotel ;
    const pagado = req.data.dineroPagado ;
    let ingresoTotal = 0;
    let gastoTotal = 0;
    let balance1 = "";
    ingresoTotal = pagado;
    gastoTotal = Comida+transporteHotel;
    
        if((ingresoTotal-gastoTotal)>=0){
          balance1= "No te devemos nada"
        }else{
          balance1= "Tenemos que pagarte:";
        }

        


      let returnData = await cds
      .transaction(req)
      .run(
        INSERT.into(ExpensesEntity).entries({
          ID:req.data.ID,
          comida: Comida,
          transporte_hotel: transporteHotel,
          dineroPagado:pagado,
          ingreso_total: ingresoTotal,
          gasto_total: gastoTotal,
          balanceT: balance1,
          balance: Math.abs(ingresoTotal-gastoTotal),
          user:{ID:parentId}
        })
  
      )
      .then((resolve, reject) => {
        console.log("resolve:", resolve);
        console.log("reject:", reject);

        if (typeof resolve !== "undefined") {
          return req.data;
        } else {
          req.error(409, "Record Not Found");
        }
      })
      .catch(err => {
        console.log(err);
        req.error(500, "Error in Updating Record");
      });
    console.log("Before End", returnData);
    return returnData;
  

}