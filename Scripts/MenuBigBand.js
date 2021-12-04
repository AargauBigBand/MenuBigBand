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
///////////////////////// Start Control Menu Desktop //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for the desktop jazz big band main menu
class DesktopMenu
{
    // Creates the instance of the class
    constructor(i_id_div_container, i_menu_name_array, i_html_name_array) 
    {
        // Member variables
        // ================

        // The identity of the dropdown control
        // this.m_id_control = i_id_drop_down;

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

        // The corresponding number array
        //Only smartphone this.m_drop_down_number_array = [];

        // Initialization
        // ==============

        this.setDivContainerElement();

        this.setControl();        
    
    } // constructor

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

        var html_str = ""; // TODO this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;        

    } // setControl    

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("MenueBigBand.DesktopMenu error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }  

        // TODO Check input arrays
        
        return ret_b_check;

    } // checkContainerElement    

} // DesktopMenu


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Menu Desktop ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Menu Smartphone ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for the smartphone jazz big band main menu
class SmartphoneMenu
{
    // Creates the instance of the class
    constructor(i_id_div_container, i_menu_name_array, i_html_name_array) 
    {
        // Member variables
        // ================

        // The identity of the dropdown control
        // this.m_id_control = i_id_drop_down;

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

        // The corresponding number array
        //Only smartphone this.m_drop_down_number_array = [];

        // Initialization
        // ==============

        this.setDivContainerElement();

        this.setControl();        
    
    } // constructor

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

        var html_str = ""; // TODO this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;        

    } // setControl    

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("MenueBigBand.SmartphoneMenu error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }  

        // TODO Check input arrays
        
        return ret_b_check;

    } // checkContainerElement    

} // SmartphoneMenu

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Menu Smartphone /////////////////////////////////////
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