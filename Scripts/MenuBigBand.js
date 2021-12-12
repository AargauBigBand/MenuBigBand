// File: MenuBigBand.js
// Date: 2021-12-12
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Classes and functions for the Jazz Big Band main menus and for the handling of devices
//
// References:

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Flag telling if it is a desktop/laptop (Undefined, TRUE or FALSE)
var g_device_desktop_laptop = "Undefined";

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Menu Big Band /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Class for the jazz big band main menu
class MenuBigBand
{
    // Creates the instance of the class
    constructor(i_id_div_container_desktop, i_id_div_container_smartphone, i_menu_name_array, i_html_name_array, i_html_file_name) 
    {
        // Member variables
        // ================

        // The identity of the dropdown control for smartphone 
        this.m_id_smartphone_drop_down = "id_smartphone_dropdown_menu";

        // The identity of the container for the desktop menu control
        this.m_id_div_container_desktop = i_id_div_container_desktop;

        // The identity of the container for the smartphone menu control
        this.m_id_div_container_smartphone = i_id_div_container_smartphone;

        // Current HTML file name (current web page)
        this.m_html_file_name = i_html_file_name;

        // The container element for the desktop menu control
        this.m_el_div_container_desktop = null;

        // The container element for the smartphone menu control
        this.m_el_div_container_smartphone = null;        

        // The class for the menu control
        this.m_class_dropdown = '';       
        
        // The onchange function name. Only the name is input
        this.m_onchange_function = 'onChangeSmartphoneMenuDropDown';

        // The input menu name array
        this.m_menu_name_array = i_menu_name_array;

        // The input array of HTML file names corresponding to m_menu_name_array
        this.m_html_name_array = i_html_name_array;

        // The corresponding number array for smartphone dropdown
        this.m_drop_down_number_array = [];

        // The width of the desktop menu button as integer. When used it is px
        this.m_desktop_button_width_int = 90;

        // Margin right for the desktop menu button as integer. When used it is px
        this.m_desktop_button_margin_right_int = 5;        

        // Margin top and bottom for the desktop menu button as integer. When used it is px
        this.m_desktop_button_margin_top_bottom_int = 10;        
        
        // Padding top and bottom for the desktop menu button as integer. When used it is px
        this.m_desktop_button_padding_top_bottom_int = 10;  

        // Desktop menu button color
        this.m_desktop_button_background_color = 'rgb(44, 61, 158)';     
        
        // Width of the smartphone drop down menu
        this.m_smartphone_drop_down_width = '250px';

        // Margin left the smartphone drop down menu
        this.m_smartphone_drop_down_margin_left = '25px';

        // Text align for the smartphone drop down menu
        this.m_smartphone_drop_down_text_align = 'center';

        // Text font size for the smartphone drop down menu
        this.m_smartphone_drop_down_font_size = 'inherit';        

        // Initialization
        // ==============

        this.setDivContainerElement();

        this.setControl();        
    
    } // constructor

    // Event functions
    // ===============

    // User clicked a menu item
    static menuItemClicked(i_name_html_file)
    {
        // alert("MenuBigBand.menuItemClicked HTML file: " + i_name_html_file);

        window.location = i_name_html_file;

    } // menuItemClicked    

    // Dropdown changed
    onChangeDropDown()
    {
        var el_drop_down = document.getElementById(this.m_id_smartphone_drop_down);

        var select_option_number =  el_drop_down.value;

        var main_menu_index = select_option_number - 1;

        var name_html_file = this.getMainMenuHtmlFile(main_menu_index);

        // alert("MenuBigBand.onChangeDropDown select_option_number= " + select_option_number.toString() + ' name_html_file= ' + name_html_file);

        window.location = name_html_file;

    } // onChangeDropDown

    // Set functions
    // =============

    // Set the left margin for the smartphone dropdown
    setDropdownMarginLeft(i_smartphone_drop_down_margin_left)
    {
        this.m_smartphone_drop_down_margin_left = i_smartphone_drop_down_margin_left;

        this.setControl();

    } // setDropdownMarginLeft

    // Set the left margin for the smartphone dropdown
    setDropdownWidth(i_smartphone_drop_down_width)
    {
        this.m_smartphone_drop_down_width = i_smartphone_drop_down_width;

        this.setControl();

    } // setDropdownWidth


    // Get HTML strings for the menu buttons
    // =====================================

    // Get the HTML string for the desktop main menu
    getHtmlDesktopString()
    {
        var ret_desktop_str = '';

        ret_desktop_str = ret_desktop_str + '<div id= "' + this.getIdDivMenuDesktop() + '" >';

        var all_buttons_str =  this.getHtmlDesktopButtonsString();

        ret_desktop_str = ret_desktop_str + all_buttons_str;

        ret_desktop_str = ret_desktop_str + '</div>';

        return ret_desktop_str;

    } // getHtmlDesktopString

    // Get string defining all desktop buttons
    getHtmlDesktopButtonsString()
    {
        var ret_buttons_str = '';

        var n_menus = this.m_menu_name_array.length;

        for (var index_menu=0; index_menu < n_menus; index_menu++)
        {
            var one_button_str =  this.getElementMainMenuButtonString(index_menu);

            ret_buttons_str = ret_buttons_str + one_button_str;
        }

        return ret_buttons_str;

    } // getHtmlDesktopButtonsString

    // Get the HTML string for the smartphone main dropdown menu
    getHtmlSmartphoneString()
    {
        var ret_smart_html_str = '';

        ret_smart_html_str = ret_smart_html_str +  '<select  id="' + this.m_id_smartphone_drop_down + '" ';

        if (this.m_class_dropdown.length > 0) // TODO 
        {
            ret_smart_html_str = ret_smart_html_str + ' class="' + this.m_class_dropdown + '" ';
        }

        ret_smart_html_str = ret_smart_html_str + ' onchange="' + this.m_onchange_function + '()" ';

        ret_smart_html_str = ret_smart_html_str + '><br>'; 

        var n_options = this.m_menu_name_array.length;

        for (var index_name=0; index_name < n_options; index_name++)
        {
            var current_name = '';

            var current_number_str = '';

            if (index_name < this.m_menu_name_array.length)
            {
                current_name = this.m_menu_name_array[index_name];

                current_number_str = this.m_drop_down_number_array[index_name].toString();
            }
            else
            {
                current_name = this.m_append_str;

                current_number_str = n_options.toString();
            }

            var option_str = '<option value="' + current_number_str + '">' +
                                    current_name + '</option><br>';

            ret_smart_html_str = ret_smart_html_str + option_str;  
        }        

        ret_smart_html_str = ret_smart_html_str + '</select>';
        

        return ret_smart_html_str;

    } // getHtmlSmartphoneString    

    // Get the string that defines a main menu button string
    getElementMainMenuButtonString(i_main_menu_index)
    {
        var main_menu_name = this.getMainMenuName(i_main_menu_index);

        var event_function_str = this.getMainMenuEventFunctionName(i_main_menu_index);

        var ret_main_menu_button_str = '';

        ret_main_menu_button_str = ret_main_menu_button_str + this.getButtonStartString();

        ret_main_menu_button_str = ret_main_menu_button_str + this.getOnClickEqualString();

        ret_main_menu_button_str = ret_main_menu_button_str + '"';

        ret_main_menu_button_str = ret_main_menu_button_str + event_function_str;

        ret_main_menu_button_str = ret_main_menu_button_str + '" >';

        ret_main_menu_button_str = ret_main_menu_button_str + main_menu_name;

        ret_main_menu_button_str = ret_main_menu_button_str + this.getButtonEndString();

        return ret_main_menu_button_str;

    } // getElementMainMenuButtonString

    // Get the main menu name
    getMainMenuName(i_main_menu_index)
    {
        var n_names = this.m_menu_name_array.length;

        if (i_main_menu_index < 0 || i_main_menu_index > n_names - 1)
        {
            return 'MenuBigBand.getMainMenuName Error Index= ' + i_main_menu_index.toString();
        }
        else
        {
            return this.m_menu_name_array[i_main_menu_index];
        }

    } // getMainMenuName

    // Get the main menu name
    getMainMenuHtmlFile(i_main_menu_index)
    {
        var n_file_names = this.m_html_name_array.length;

        if (i_main_menu_index < 0 || i_main_menu_index > n_file_names - 1)
        {
            return 'MenuBigBand.getMainMenuHtmlFile Error Index= ' + i_main_menu_index.toString();
        }
        else
        {
            return this.m_html_name_array[i_main_menu_index];
        }

    } // getMainMenuHtmlFile

    // Get the option number for a given HTML file name (web page)
    getMainMenuSelectOptionNumber(i_html_file)
    {
        var ret_number = -1;

        var index_last_slash = -9;

        for (var index_char=0; index_char < i_html_file.length; index_char++)
        {
            var current_char = i_html_file.substring(index_char, index_char + 1);

            if (current_char == '/')
            {
                index_last_slash = index_char;
            }
        }

        var html_file = i_html_file;

        if (index_last_slash >= 0)
        {
            html_file = i_html_file.substring(index_last_slash + 1);
        }

        var n_file_names = this.m_html_name_array.length;

        for (var index_name=0; index_name < n_file_names; index_name++)
        {
            var current_name = this.m_html_name_array[index_name];

            if (html_file == current_name)
            {
                ret_number = index_name + 1;

                break;
            }
        }

        return ret_number;

    } // getMainMenuSelectOptionNumber

    // Returns the main menu event function name for a given main menu index
    getMainMenuEventFunctionName(i_main_menu_index)
    {
        var file_name = this.getMainMenuHtmlFile(i_main_menu_index);

	    return "MenuBigBand.menuItemClicked('" + file_name + "')";
	
    } // getMainMenuEventFunctionName

    // Returns <button string
    getButtonStartString()
    {
        return '<button ';

    } // getButtonStartString

    // Returns </button> string
    getButtonEndString()
    {
        return '</button>';
        
    } // getButtonEndString    

    // Returns ' onclick= '
    getOnClickEqualString()
    {
        return ' onclick= ';

    } // getOnClickEqualString

 
    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container_desktop = document.getElementById(this.m_id_div_container_desktop);

        this.m_el_div_container_smartphone = document.getElementById(this.m_id_div_container_smartphone);

    } // setDivContainerElement

    // Returns the identity for the <div> with the desktop menu
    getIdDivMenuDesktop()
    {
        return 'id_div_big_band_menu_desktop';

    } // getIdDivMenuDesktop

    // Returns the <div> desktop menu element
    getElementDivMenuDesktop()
    {
        return document.getElementById(this.getIdDivMenuDesktop());

    } // getElementDivMenuDesktop

    // Returns the identity for the <div> with the smartphone menu
    getIdDivMenuSmartphone()
    {
        return 'id_div_big_band_menu_smartphone';

    } // getIdDivMenuSmartphone    

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_desktop_str = this.getHtmlDesktopString();

        this.m_el_div_container_desktop.innerHTML = html_desktop_str; 

        this.setNumberArray();

        var html_smartphone_str = this.getHtmlSmartphoneString();

        this.m_el_div_container_smartphone.innerHTML = html_smartphone_str;        
        
        this.setStyles();

        var el_drop_down = document.getElementById(this.m_id_smartphone_drop_down);

        var select_option_number = this.getMainMenuSelectOptionNumber(this.m_html_file_name);

        el_drop_down.value = select_option_number;

    } // setControl    

    // Set the styles for the desktop and smartphone menus
    setStyles()
    {
        this.setStylesDesktop();

        this.setStylesSmartPhone();

    } // setStyles

    // Set the styles for the desktop menu
    setStylesDesktop()
    {
        var el_div_menu_desktop = this.getElementDivMenuDesktop();

        var button_elements = el_div_menu_desktop.childNodes;

        var n_buttons = button_elements.length;

        for (var index_button=0; index_button < n_buttons; index_button++)
        {
            var button_el = button_elements[index_button];

            button_el.style.width = this.m_desktop_button_width_int.toString() + 'px';

            button_el.style.marginRight = this.m_desktop_button_margin_right_int.toString() + 'px';

            button_el.style.marginTop = this.m_desktop_button_margin_top_bottom_int.toString() + 'px';

            button_el.style.marginBottom = this.m_desktop_button_margin_top_bottom_int.toString() + 'px';

            button_el.style.paddingTop = this.m_desktop_button_margin_top_bottom_int.toString() + 'px';

            button_el.style.paddingBottom = this.m_desktop_button_padding_top_bottom_int.toString() + 'px';     

            button_el.style.backgroundColor = this.m_desktop_button_background_color;     
            
            button_el.style.color = 'white';   

            button_el.style.fontWeight = 'bold';   

            button_el.style.cursor  = 'pointer';  
        }

        var buttons_width_int = n_buttons*(this.m_desktop_button_width_int + this.m_desktop_button_margin_right_int);

        el_div_menu_desktop.style.width = buttons_width_int.toString() + 'px';
    
        el_div_menu_desktop.style.display = 'block';

        el_div_menu_desktop.style.marginLeft = 'auto';

        el_div_menu_desktop.style.marginRight = 'auto';

    } // setStylesDesktop

    // Set the styles for the smartphone menu
    setStylesSmartPhone()
    {
        var el_drop_down = document.getElementById(this.m_id_smartphone_drop_down);

        el_drop_down.style.backgroundColor = this.m_desktop_button_background_color;   

        el_drop_down.style.width = this.m_smartphone_drop_down_width;
        
        el_drop_down.style.marginLeft = this.m_smartphone_drop_down_margin_left;

        el_drop_down.style.marginTop = this.m_desktop_button_margin_top_bottom_int.toString() + 'px';

        el_drop_down.style.marginBottom = this.m_desktop_button_margin_top_bottom_int.toString() + 'px';        

        el_drop_down.style.paddingTop = this.m_desktop_button_margin_top_bottom_int.toString() + 'px';

        el_drop_down.style.paddingBottom = this.m_desktop_button_padding_top_bottom_int.toString() + 'px';             

        el_drop_down.style.color = 'white';   

        el_drop_down.style.fontWeight = 'bold';

        el_drop_down.style.textAlign = this.m_smartphone_drop_down_text_align;

        el_drop_down.style.fontSize = this.m_smartphone_drop_down_font_size;

    } // setStylesSmartPhone

    // Sets the number array for smartphone dropdown 
    setNumberArray()
    {
        this.m_drop_down_number_array = [];

        var array_number = 0;
        
        for (var index_name=0; index_name < this.m_menu_name_array.length; index_name++)
        {
            array_number = array_number + 1;

            this.m_drop_down_number_array[index_name] = array_number;
        }

    } // setNumberArray

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container_desktop)
        {
            alert("MenuBigBand error: HTML element with id= " + this.m_id_div_container_desktop + " does not exist.");

            ret_b_check = false;
        }  

        // TODO Check input arrays
        
        return ret_b_check;

    } // checkContainerElement    

} // MenuBigBand


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Menu Big Band ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Device Types //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns true if the browser window has desktop or laptop width (criterion 768px)
// Returns false it is a smartphone (or perhaps tablet) window 
function browserWindowHasDesktopWidth()
{
    if ("TRUE" == g_device_desktop_laptop)
    {
        return true;
    }
   else if ("FALSE" == g_device_desktop_laptop)
   {
        return false;
   }
   else
   {
       alert("browserWindowHasDesktopWidth error. g_device_desktop_laptop= " + g_device_desktop_laptop)
       return true;
   }

} // deviceDesktop

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Device Types ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Media Query Event Functions ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// This function must be run when the web page is loaded
function execMediaQueryEventFunctions()
{
    mediaQueryEventDesktopLaptop(g_media_query_desktop_laptop);

} // execMediaQueryEventFunctions

// Desktop-Laptop Media Query Criterion
var g_media_query_desktop_laptop = window.matchMedia(
    "only screen and (min-width : 801px)");

// Media query listener event function for desktop/laptop
// The value g_device_desktop_laptop can change when the screen is resized
function mediaQueryEventDesktopLaptop(i_media_query_desktop_laptop_criterion) 
{
    if (i_media_query_desktop_laptop_criterion.matches) 
    { 
        g_device_desktop_laptop = "TRUE";
    } 
    else 
    {
        g_device_desktop_laptop = "FALSE";
    }

    eventDeviceWindowSize();

} // mediaQueryEventDesktopLaptop


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Media Query Event Functions /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Page Width ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set page width for desktop or smartphone
function setPageWidthDesktopOrSmartphone()
{
    var el_page = getElementDivPage();

    if (browserWindowHasDesktopWidth())
    {    
        el_page.style.width = "1023px";
    }
    else
    {
        el_page.style.width = "600px";
    }

} // setPageWidthDesktopOrSmartphone

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Page Width //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Update Web Page Functions /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Device window size is determined or has been changed so that the width of the browser
// window became smaller or bigger than the width criterion for a desktop computer
// 1. Set the <page> width. Call of setPageWidthDesktopOrSmartphone
function eventDeviceWindowSize()
{
    setPageWidthDesktopOrSmartphone();

    displayHideContentDivs();

} // eventDeviceWindowSize

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Update Web Page Functions ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide Display Content Divs /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function displayHideContentDivs()
{
    var el_div_container_desktop_desktop = getElementDivContentDesktop();

    var el_div_container_desktop_smartphone = getElementDivContentSmartphone();

    if (browserWindowHasDesktopWidth())
    {   
        el_div_container_desktop_desktop.style.display = 'block';

        el_div_container_desktop_smartphone.style.display = 'none';
    }
    else
    {
        el_div_container_desktop_desktop.style.display = 'none';

        el_div_container_desktop_smartphone.style.display = 'block';
    }

} // displayHideContentDivs

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Hide Display Content Divs ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Html Elements and Identities //////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Get the div element for the page 
function getElementDivPage()
{
    var id_div_page = getIdDivPage();

    return document.getElementById(id_div_page);

} // getElementDivPage

// Returns the identity of the div for the page
function getIdDivPage()
{
    return 'id_div_page';

} // getIdDivPage

// Get the div element for the div desktop content 
function getElementDivContentDesktop()
{
    var id_div_content_desktop = getIdDivContentDesktop();

    return document.getElementById(id_div_content_desktop);

} // getElementDivContentDesktop

// Returns the identity of the div desktop content 
function getIdDivContentDesktop()
{
    return 'id_div_main_content_desktop';

} // getIdDivContentDesktop

// Get the div element for the div smartphone content 
function getElementDivContentSmartphone()
{
    var id_div_content_smartphone = getIdDivContentSmartphone();

    return document.getElementById(id_div_content_smartphone);

} // getElementDivContentSmartphone

// Returns the identity of the div smartphone content 
function getIdDivContentSmartphone()
{
    return 'id_div_main_content_smartphone';

} // getIdDivContentSmartphone

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Html Elements and Identities ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////