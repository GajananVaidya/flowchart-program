$(document).ready(function(){
    var data = {"number" : 10};
    $.ajax({
        url: "Rules.json",
        contentType: "application/json",
        success: function(result){
        var i=0;
        while(i<result.length){
            var inputFunction = result[i].body.condition;
            var temp = '';                
            var num = data.number;
            var conditionSucess = false;
            if(eval(inputFunction)){
                console.log(result[i].body.successmsg);
                temp += '<div class="panel panel-default"><div class="panel-heading successpanel"><h4 class="panel-title">';
                temp += '<a data-toggle="collapse" href="#collapse'+i+'"> Rule '+ result[i].ruleId + '</a></h4></div>';
                temp += '<div id="collapse'+i+'" class="panel-collapse collapse"><div class="panel-body">';
                conditionSucess = true;
            } else {
                console.log(result[i].body.errormsg);
                temp += '<div class="panel panel-default"><div class="panel-heading errorpanel"><h4 class="panel-title">';
                temp += '<a data-toggle="collapse" href="#collapse'+i+'"> Rule '+ result[i].ruleId + '</a></h4></div>';
                temp += '<div id="collapse'+i+'" class="panel-collapse collapse"><div class="panel-body">';
            }
                if(inputFunction){
                    temp += '<div class="col-md-12"><input type="text" class="form-control" value="function(num){ if ('+inputFunction+') return true; else return false; }" /></div>';
                }
                else{
                    temp += '<div class="col-md-12"><input type="text" class="form-control" value="" /></div>';
                }
                temp += '<div class="" style="margin-top:50px;"><div class="col-md-6"><label>Next Rule if it passed</label><input type="text" class="form-control" value="'+ result[i].body.true_id +'"/></div>';
                temp += '<div class="col-md-6"><label>Next Rule if it failed</label><input type="text" class="form-control" value="'+ result[i].body.false_id +'"/></div></div>';
                temp += '</div></div></div>';
                $('#resultcontainer').append(temp);
                if(conditionSucess){
                    if(result[i].body.true_id == null)
                        return;
                    else
                        i = result[i].body.true_id-1;  
                }
                else {
                    if(result[i].body.false_id == null)
                        return;
                    else
                        i = result[i].body.false_id-1;
                }
        }
    }
});
});