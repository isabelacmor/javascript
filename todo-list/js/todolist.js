var todo = todo || {},
    data = JSON.parse(localStorage.getItem("todoData"));

data = data || {};

(function(todo, data, $) {
    var constants = {
         todoTask : "todo-task"
        ,todoHeader : "task-header"
        ,todoDate : "task-date"
        ,todoDescription : "task-description"
        ,taskId : "task-"
        ,formId : "todo-form"
        ,dataAttr : "data"
        ,deleteContainer : "delete-container"
    }, codes = {
         "1" : "#pending"
        ,"2" : "#inProgress"
        ,"3" : "#completed"
    };
    
    todo.init = function(options){
        options = options || {};
        options = $.extend({}, constants, options);
        
        $.each(data, function(index, params) {
            generateElement(params);
        });
        
        //Add drop function to each category of a task
        
        $.each(codes, function(index, value) {
            $(value).droppable({
                drop: function(event, ui){
                    var element = ui.helper,
                        css_id = element.attr("id"),
                        id = css_id.replace(options.taskId, ""),
                        object = data[id];
                    
                    //remove old element
                    removeElement(object);
                    
                    //change object
                    object.code = index;
                    
                    //generate new object
                    generateElement(object);
                    
                    //update local storage
                    data[id] = object;
                    localStorage.setItem("todoData", JSON.stringify(data));data
                    //hide delete container
                    $("#" + constants.deleteContainer).hide();
                }
            });
        });
        
        //add drop function to delete container
        $("#" + options.deleteContainer).droppable({
            drop: function(event, ui){
                var element = ui.helper,
                    css_id = element.attr("id"),
                    id = css_id.replace(options.taskId, ""),
                    object = data[id];
                
                //remove old element
                removeElement(object);
                
                //update local storage
                delete data[id];
                localStorage.setItem("todoData", JSON.stringify(data));
                
                //hide delete area
                $("#" + constants.deleteContainer).hide();
            }
        })
    };

/*
Add task
*/

var generateElement = function(params) {
    var parent = $(code[params.code]),
        wrapper;
    
    if(!parent) return;
    
    wrapper = $("<div />", {
         "class" : constants.todoTask
        ,"id" : constants.taskId + params.id
        ,"data" : params.id 
    }).appendTo(wrapper);
    
    $("<div />", {
         "class" : constants.todoHeader,
        ,"text" : params.title
    }).appendTo(wrapper);
    
    $("<div />", {
         "class" : constants.todoDate
        ,"text" : params.date
    }).appendTo(wrapper);
    
    $("<div />", {
         "class" : constants.todoDescription
        ,"text" : params.description
    }).appendTo(wrapper);
    
    wrapper.draggable({
        start: function(){
            $("#" + constants.deleteContainer).show();
        },
        stop: function(){
            $("#" + constants.deleteContainer).hide();
        },
        revert: "invalid",
        revertDuration: 200
    });
};

/*
Delete task
*/

var removeElement = function(params){
    $("#" + constants.taskId + params.id).remove();
};

/*
Submitting the form
*/

todo.add = function(){
    var inputs = $("#" + constants.formId + " :input"), errorMessage = "Title cannot be empty", id, title, description, date, tempData;
    
    if(inputs.length !== 4) return;
    
    title = inputs[0].value;
    description = inputs[1].value;
    date = inputs[2].value;
    
    if(!title){
        generateDiaglog(errorMessage);
        return;
    }
    
    id = new Date().getTime();
    
    tempDate = {
         id : id
        ,code : "1"
        ,title : title
        ,date : date
        ,description : description
        
    };
    
    //save task in HTML5 local storage
    data[id] = tempData;
    localStorage.setItem("todoDate", JSON.stringify(data));
    
    //generate task
    generateElement(tempData);
    
    //reset form
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
};
    
    var generateDialog = function(message){
        var responseId = "response-dialog",
            title = "Message",
            responseDialog = $("#" + responseId),
            buttonOptions;
        
        if(!responseDialog.length){
            responseDialog = $("<div />", {
                title: title,
                id: responseId}).appendTo($("body"));
        }
        
        responseDialog.html(message);
        
        buttonOptions = {
            "Okay" : function(){
                responseDialog.dialog("close");
            }
        };
        
        responseDialog.dialog({
            autoOpen: true,
            width: 400,
            modal: true,
            closeOnEscape: true,
            buttons: buttonOptions
        });
    };
    
    todo.clear = function(){
        data = {};
        localStorage.setItem("todoData", JSON.stringify(data));
        $("." + constants.todoTask).remove();
    };
})(todo, data, jQuery);