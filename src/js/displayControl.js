document.addEventListener('DOMContentLoaded', function (){
  // Get Drop Down Menu Items
var dropDownMenu = document.getElementById('dropDownMenu');
var dropDownTitle = document.getElementById('wireDuctSizingHeaderButton');
var dropDownContent = document.getElementById('wireDuctDropDown');
var dropDownSelectButton = document.getElementsByClassName('dropDownSelectButton');
var dropDownSubMenu = document.getElementsByClassName('dropDownSubMenu');

  // Add an event for mouse enter over DIV, then display first level of Drop Down  
dropDownTitle.addEventListener('mouseenter', function() {
  dropDownContent.classList.add('dropDownActiveTop')
});

  // Add an event for mouse enter over DIV, then display first level of Drop Down  
dropDownContent.addEventListener('mouseleave', function() {
  setTimeout( () => { 
    dropDownContent.classList.remove('dropDownActiveTop');
    Array.prototype.forEach.call(dropDownSelectButton, (element) => { element.classList.remove('buttonActive')});    
  }, 100)});

Array.prototype.forEach.call(dropDownSelectButton, (dropDownButtonElement) => {

    // Add an event for mouse enter over Container DIV, then display second level of Drop Down  
    dropDownButtonElement.addEventListener('mouseenter', function () {
      dropDownButtonElement.parentNode.classList.add('buttonActive');
    });
 
      // Add an event for mouse leaving out of Container DIV, implement 100ms delay to ease navigation  
      dropDownButtonElement.addEventListener('mouseleave', function () {
      setTimeout( () => {
        dropDownButtonElement.classList.remove('dropDownActiveSide');
      }, 100); //100 ms delay
    });

});

  // Go through all sub menu elements and and add event listener for each to permit display of submenu
Array.prototype.forEach.call(dropDownSubMenu, (dropDownSubMenuElement) => {
  const dropDownSubMenuContent = dropDownSubMenuElement.querySelector('.dropDownSubContent');

    // Add an event for mouse enter over Container DIV, then display second level of Drop Down  
  dropDownSubMenuElement.addEventListener('mouseenter', function () {
    dropDownSubMenuContent.parentNode.classList.add('buttonActive');
    dropDownSubMenuContent.classList.add('dropDownActiveSide');
  });

    // Add an event for mouse leaving out of Container DIV, implement 100ms delay to ease navigation  
  dropDownSubMenuElement.addEventListener('mouseleave', function () {
    setTimeout( () => {
     dropDownSubMenuContent.parentNode.classList.remove('buttonActive');
     dropDownSubMenuContent.classList.remove('dropDownActiveSide');
    }, 100); //100 ms delay
  });
      
});

});