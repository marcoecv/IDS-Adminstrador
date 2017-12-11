
function updateProfitGameLines(data){
    var tr=$("#"+data["GameNum"]+"_A");
    var filter=$("#wagerLineFilter").val();
    if(tr.lenght!==0){
        
        var profitArray=setWagerValuesByFilter(filter,data);
        var wspa=(profitArray[0]===0&&profitArray[1]===0)?"":profitArray[0];
        var wsph=(profitArray[0]===0&&profitArray[1]===0)?"":profitArray[1];
        
        var wmla=(profitArray[2]===0&&profitArray[3]===0)?"":profitArray[2];
        var wmlh=(profitArray[2]===0&&profitArray[3]===0)?"":profitArray[3];
        var wmld=profitArray[4]===0?"":profitArray[4];
        
        var wta=(profitArray[5]===0&&profitArray[6]===0)?"":profitArray[5];
        var wth=(profitArray[5]===0&&profitArray[6]===0)?"":profitArray[6];
        
        var wttoa=(profitArray[7]===0&&profitArray[8]===0)?"":profitArray[7];
        var wttoh=(profitArray[7]===0&&profitArray[8]===0)?"":profitArray[8];
        
        var wttua=(profitArray[9]===0&&profitArray[10]===0)?"":profitArray[9];
        var wttuh=(profitArray[9]===0&&profitArray[10]===0)?"":profitArray[10];
        $("#"+data["GameNum"]+"_A .wsp").val(wspa);
        $("#"+data["GameNum"]+"_H .wsp").val(wsph);
        $("#"+data["GameNum"]+"_A .wml").val(wmla);
        $("#"+data["GameNum"]+"_H .wml").val(wmlh);
        if(selectedSport==="Soccer")
            $("#"+data["GameNum"]+"_D .wml").val(wmld);
        $("#"+data["GameNum"]+"_A .wt").val(wta);
        $("#"+data["GameNum"]+"_H .wt").val(wth);
        $("#"+data["GameNum"]+"_A .wtto").val(wttoa);
        $("#"+data["GameNum"]+"_H .wtto").val(wttoh);
        $("#"+data["GameNum"]+"_A .wttu").val(wttua);
        $("#"+data["GameNum"]+"_H .wttu").val(wttuh);
    }
}