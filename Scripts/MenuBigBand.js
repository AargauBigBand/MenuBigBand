// File: MenuBigBand.js
// Date: 2021-12-04
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
///////////////////////// Start Menu Event Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked a menu item
function mainBigBandMenuItemClicked(i_name_html_file)
{
    alert("mainBigBandMenuItemClicked HTML file: " + i_name_html_file);

} // mainBigBandMenuItemClicked

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Menu Event Functions ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Menu Big Band /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for the jazz big band main menu
class MenuBigBand
{
    // Creates the instance of the class
    constructor(i_id_div_container, i_menu_name_array, i_html_name_array, i_desktop) 
    {
        // Member variables
        // ================

        // The identity of the dropdown control for smartphone 
        this.m_id_control = "id_smartphone_dropdown_menu";

        // The identity of the container for the menu control
        this.m_id_div_container = i_id_div_container;

        // The container element for the menu control
        this.m_el_div_container = null;

        // The class for the menu control
        //??? this.m_class = '';        

        // The input menu name array
        this.m_menu_name_array = i_menu_name_array;

        // The input array of HTML file names corresponding to m_menu_name_array
        this.m_html_name_array = i_html_name_array;

        // Boolean telling if menus shall be created for Desktop or Smartphone
        this.m_desktop = i_desktop;

        // The corresponding number array for smartphone dropdown
        this.m_drop_down_number_array = [];

        // Initialization
        // ==============

        this.setDivContainerElement();

        this.setControl();        
    
    } // constructor

    // Get HTML strings for the menu buttons
    // =====================================

    // Get the HTML string for the main menu
    getHtmlString()
    {
        if (this.m_desktop)
        {
            return this.getHtmlDesktopString();
        }
        else
        {
            return this.getHtmlSmartphoneString();
        }

    } // getHtmlString

    // Get the HTML string for the desktop main menu
    getHtmlDesktopString()
    {
        var main_menu_index = 0;

        var one_button_str =  this.getElementMainMenuButtonString(main_menu_index);

        return one_button_str;

    } // getHtmlDesktopString

    // Get the HTML string for the smartphone main menu
    getHtmlSmartphoneString()
    {
        return 'TODO';

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

    // Returns the main menu event function name for a given main menu index
    getMainMenuEventFunctionName(i_main_menu_index)
    {
        var file_name = this.getMainMenuHtmlFile(i_main_menu_index);

	    return "mainBigBandMenuItemClicked('" + file_name + "')";
	
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
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;        

    } // setControl    

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("MenuBigBand error: HTML element with id= " + this.m_id_div_container + " does not exist.");

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
    var el_div_container_desktop = getElementDivContentDesktop();

    var el_div_container_smartphone = getElementDivContentSmartphone();

    if (browserWindowHasDesktopWidth())
    {   
        el_div_container_desktop.style.display = 'block';

        el_div_container_smartphone.style.display = 'none';
    }
    else
    {
        el_div_container_desktop.style.display = 'none';

        el_div_container_smartphone.style.display = 'block';
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