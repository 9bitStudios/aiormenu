/*
* File: jquery.aiormenu.js
* Version: 1.0.0
* Description: AIOR (All in One Responsive) Menu - jQuery Plugin to create responsive menus from a given menu
* Author: 9bit Studios
* Copyright 2014, 9bit Studios
* http://www.9bitstudios.com
* Free to use and abuse under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {

    $.fn.aiormenu = function (options) {

        var defaults = $.extend({
            targetContainer: null,            
            type: 'select',
            menuID: 'responsiveMenu'
        }, options);
        
        /******************************
        Private Variables
        *******************************/         
        
        var object = $(this);
        var settings = $.extend(defaults, options);           
        var panelOpen = false;
        
        /******************************
        Public Methods
        *******************************/        
        
        var methods = {
                
            init: function() {
                
                return this.each(function () {
                    methods.appendHTML();
                    methods.setEventHandlers();                  
                });
            },
            
            /******************************
            Append HTML
            *******************************/            
            
            appendHTML: function() {
            
                switch(settings.type)
                {
                    case 'select':
                        methods.createSelectBox();
                        break;
                      
                    case 'list':
                        methods.createList();
                        break;
                    
                    case 'overlay':
                        methods.createOverlay();
                        break;                    
                    
                    case 'panel':
                        methods.createPanel();
                        break;
                    
                    default:
                        methods.createSelectBox();
                }            
            
            },

            /******************************
            Create List
            *******************************/            
            
            createList: function() {
                
                var outputMarkup = '<a href="#" id="'+ settings.menuID +'-trigger" class="nbs-aiorm-menu-trigger"></a>';
                
                outputMarkup += '<div class="nbs-aiorm-wrap"><ul id="'+ settings.menuID +'" class="nbs-aiorm-list-menu">';
                
                var menuItems = object.find("li");
                menuItems.each(function() {
                    outputMarkup += '<li>'+$(this).html()+'</li>';
                });
                
                outputMarkup += '</ul></div>';
                
                if(settings.targetContainer) {
                    $(outputMarkup).appendTo($(settings.targetContainer));
                }
                else 
                    $(outputMarkup).insertAfter($(object));
            },                

            /******************************
            Create Select Box
            *******************************/            
            createSelectBox: function() {
                var outputMarkup = '';                
                outputMarkup +=    '<select id="'+ settings.menuID +'" class="nbs-aiorm-select-menu">';
                outputMarkup += '<option value="#">....</option>';
                var menuItems = object.find("li a");
                menuItems.each(function(){
                    outputMarkup += '<option value="' + $(this).attr("href") + '">'+$(this).text()+'</option>';
                });
                outputMarkup += '</select>';
                
                if(settings.targetContainer) {
                    $(outputMarkup).appendTo($(settings.targetContainer));
                }
                else 
                    $(outputMarkup).insertAfter($(object));
            },
            
            /******************************
            Create Overlay
            *******************************/            
            createOverlay: function() {
            
                var triggerMarkup = '<a href="#" id="'+ settings.menuID +'-trigger" class="nbs-aiorm-menu-trigger"></a>';
                var outputMarkup = '<div class="nbs-aiorm-overlay"><a href="#" class="nbs-aiorm-overlay-close"></a>';
                
                outputMarkup += '<ul id="'+ settings.menuID +'" class="nbs-aiorm-overlay-menu">';

                var menuItems = object.find("li");
                menuItems.each(function() {
                
                    outputMarkup += '<li>'+$(this).html()+'</li>';
                });
                outputMarkup += '</ul></div>';
                
                if(settings.targetContainer) {
                    $(triggerMarkup).appendTo($(settings.targetContainer));
                }
                else 
                    $(triggerMarkup).insertAfter($(object));
                    
                $(outputMarkup).prependTo('body');            
            },            
            
            /******************************
            Create Panel
            *******************************/            
            createPanel: function() {
            
                var triggerMarkup = '<a href="#" id="'+ settings.menuID +'-trigger" class="nbs-aiorm-menu-trigger"></a>';
                var outputMarkup = '<div class="nbs-aiorm-panel"></a>';
                
                outputMarkup += '<ul id="'+ settings.menuID +'" class="nbs-aiorm-panel-menu">';

                var menuItems = object.find("li");
                menuItems.each(function() {
                
                    outputMarkup += '<li>'+$(this).html()+'</li>';
                });
                outputMarkup += '</ul></div>';
                
                if(settings.targetContainer) {
                    $(triggerMarkup).appendTo($(settings.targetContainer));
                }
                else 
                    $(triggerMarkup).insertAfter($(object));
                    
                $(outputMarkup).prependTo('body');            
            },
            
            /******************************
            Handle Click
            *******************************/            
            handleClick: function(){
                
                switch(settings.type)
                {
                      
                    case 'list':
                        $('#'+settings.menuID).slideToggle();
                        break;
                    
                    case 'overlay':
                        $('.nbs-aiorm-overlay').css('display', 'block');
                        break;
                    
                    case 'panel':
                        methods.slidePanel();                    
                        break;        
                    
                    default:
                      return;
                }                
                
            },
            
            /******************************
            Slide Panel
            *******************************/            
            slidePanel: function(){
                
                if(panelOpen){
                    $('.nbs-aiorm-panel').animate({ left: -320 });
                    $('body').animate({ left: 0 });
                    panelOpen = false;
                } else {
                    $('.nbs-aiorm-panel').animate({ left: 0 });
                    $('body').animate({ left: 320 });         
                    panelOpen = true;
                }
            },            
            
            /******************************
            Set Event Handlers
            *******************************/
            setEventHandlers: function() {

                $('body').on('change', '#' + settings.menuID, function() {  
                    if ($(this).val() !== '') {
                        window.location.href=$(this).val();
                    }
                });
                
                $('#'+settings.menuID+'-trigger').click(function(){
                    methods.handleClick();
                    return false;
                });
                
                $('.nbs-aiorm-overlay-close').click(function(){
                    $('.nbs-aiorm-overlay').css('display','none');
                    return false;
                });                
                
            }
        
        };
        
        if (methods[options]) {     // $("#element").pluginName('methodName', 'arg1', 'arg2');
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) {     // $("#element").pluginName({ option: 1, option:2 });
            return methods.init.apply(this);  
        } else {
            $.error( 'Method "' +  method + '" does not exist in responsiveMenu plugin!');
        }        
    };

})(jQuery);
