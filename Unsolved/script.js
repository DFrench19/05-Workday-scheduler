$(document).ready(function() {

  const test = false;
  const now = moment().format('MMMM Do YYYY');

  let nowHour24 = moment().format('H');
  let nowHour12 = moment().format('h');

  if (test) {
    nowHour24 = 13;
    nowHour12 = 1;
  }
  let $dateHeading = $('#navbar-subtitle');
  $dateHeading.text(now);
  

  let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else {
   
    planTextArr = new Array(9);
    
  }
  let $plannerDiv = $('#plannerContainer');

  $plannerDiv.empty();

  for (let hour = 9; hour <= 17; hour++) {
   
    let index = hour - 9;
    
    let $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index',hour);

    let $TimeDiv = $('<div>');
    $TimeDiv.addClass('col-md-2');
  
    const $timeBox = $('<span>');
   
    $timeBox.attr('class','timeBox');
    
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    $timeBox.text(`${displayHour} ${ampm}`);

    $rowDiv.append($TimeDiv);
    $TimeDiv.append($timeBox);
    
    let $dailyPlan = $('<input>');

    $dailyPlan.attr('id',`input-${index}`);
    $dailyPlan.attr('hour-index',index);
    $dailyPlan.attr('type','text');
    $dailyPlan.attr('class','dailyPlan');

    $dailyPlan.val( planTextArr[index] );
    
    let $IptDiv = $('<div>');
    $IptDiv.addClass('col-md-9');

    $rowDiv.append($IptDiv);
    $IptDiv.append($dailyPlan);
    
    let $SaveDiv = $('<div>');
    $SaveDiv.addClass('col-md-1');

    let $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"far fa-save saveIcon");
    
    
    $rowDiv.append($SaveDiv);
    $SaveDiv.append($saveBtn);
 
    updateRowColor($rowDiv, hour);

    $plannerDiv.append($rowDiv);
  };
  function updateRowColor ($hourRow,hour) { 
    if ( hour < nowHour24) {
      $hourRow.css("background-color","white")
    } else if ( hour > nowHour24) {
     
      $hourRow.css("background-color","green")
    } else {
      $hourRow.css("background-color","red")
    }
  };
  $(document).on('click','i', function(event) {
    event.preventDefault();  

    let $index = $(this).attr('save-id');

    let inputId = '#input-'+$index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;

    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });  
  
});
