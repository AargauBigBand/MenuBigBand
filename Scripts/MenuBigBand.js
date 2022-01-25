// File: MenuBigBand.js
// Date: 2022-01-25
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
// Input data:
// Identity for the desktop menu <div> 
// Identity for the smartphone menu <div> 
// Array of menu names
// Array of desktop HTML file names corresponding to the menu names
// Array of smartphone HTML file names corresponding to the menu names
// The last input array may have the value null. In this case will the 
// desktop HTML file names also be used for smartphone
class MenuBigBand
{
    // Creates the instance of the class
    constructor(i_id_div_menu_desktop, i_id_div_menu_smartphone, i_menu_name_array, i_html_name_desktop_array, i_html_name_smartphone_array) 
    {
        // Member variables
        // ================

        // The identity of the dropdown control for smartphone 
        this.m_id_smartphone_drop_down = "id_smartphone_dropdown_menu";

        // The identity of the container for the desktop menu control
        this.m_id_div_menu_desktop = i_id_div_menu_desktop;

        // The identity of the container for the smartphone menu control
        this.m_id_div_menu_smartphone = i_id_div_menu_smartphone;

        // Current HTML file name (current web page)
        //QQ this.m_html_file_name = i_html_file_name;
        this.m_html_file_name = null;

        // The container element for the desktop menu control
        this.m_el_div_menu_desktop = null;

        // The container element for the smartphone menu control
        this.m_el_div_menu_smartphone = null;        

        // The class for the menu control
        this.m_class_dropdown = '';       
        
        // The onchange function name. Only the name is input
        this.m_onchange_function = 'onChangeSmartphoneMenuDropDown';

        // The input menu name array
        this.m_menu_name_array = i_menu_name_array;

        // The input array of HTML file names corresponding to m_menu_name_array
        this.m_html_name_desktop_array = i_html_name_desktop_array;

        // The input array of HTML file names for smartphone corresponding to m_menu_name_array
        this.m_html_name_smartphone_array = i_html_name_smartphone_array;

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

        // Desktop menu button background color
        this.m_desktop_button_background_color = 'rgb(44, 61, 158)'; 

        // Desktop menu button pen color
        this.m_desktop_button_pen_color = 'white';
        
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

        this.checkSetControl();
    
    } // constructor

    // Check input data and set control if data is OK
    checkSetControl()
    {
        if (this.checkConstructorInputData())
        {
            this.setControl();
        }

    } // checkSetControl

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

        var name_html_file = this.getDesktopMainMenuHtmlFile(main_menu_index);

        // alert("MenuBigBand.onChangeDropDown select_option_number= " + select_option_number.toString() + ' name_html_file= ' + name_html_file);

        window.location = name_html_file;

    } // onChangeDropDown

    // Set functions
    // =============

    // Set the left margin for the smartphone dropdown
    setDropdownMarginLeft(i_smartphone_drop_down_margin_left)
    {
        if (!this.checkDimensionInput(i_smartphone_drop_down_margin_left))
        {
            return
        }

        this.m_smartphone_drop_down_margin_left = i_smartphone_drop_down_margin_left;

        this.setControl();

    } // setDropdownMarginLeft

    // Set the left margin for the smartphone dropdown
    setDropdownWidth(i_smartphone_drop_down_width)
    {
        if (!this.checkDimensionInput(i_smartphone_drop_down_width))
        {
            return
        }

        this.m_smartphone_drop_down_width = i_smartphone_drop_down_width;

        this.setControl();

    } // setDropdownWidth

    // Set the width of the desktop button
    setDesktopButtonWidth(i_desktop_button_width)
    {
        if (!this.checkDimensionInput(i_desktop_button_width))
        {
            return
        }

        var index_px= i_desktop_button_width.indexOf('px');

        var start_part_str = i_desktop_button_width.substring(0, index_px);

        var desktop_button_width_int = parseInt(start_part_str);

        this.m_desktop_button_width_int = desktop_button_width_int;

        this.setControl();

    } // setDropdownWidth

    // Set the desktop button background color
    setDesktopButtonBackgroundColor(i_color_str)
    {
        this.m_desktop_button_background_color = i_color_str;

        this.setControl();

    } // setDesktopButtonColor

    // Set the desktop button pen color
    setDesktopButtonPenColor(i_color_str)
    {
        this.m_desktop_button_pen_color = i_color_str;

        this.setControl();

    } // setDesktopButtonPenColor

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

    // Get the desktop HTML file name corresponding to the main menu names
    getDesktopMainMenuHtmlFile(i_main_menu_index)
    {
        var n_file_names = this.m_html_name_desktop_array.length;

        if (i_main_menu_index < 0 || i_main_menu_index > n_file_names - 1)
        {
            return 'MenuBigBand.getDesktopMainMenuHtmlFile Error Index= ' + i_main_menu_index.toString();
        }
        else
        {
            return this.m_html_name_desktop_array[i_main_menu_index];
        }

    } // getDesktopMainMenuHtmlFile

    // Get the smartphone HTML file name corresponding to the main menu names
    getSmartphoneMainMenuHtmlFile(i_main_menu_index)
    {
        if (!this.smartphoneHtmlFilesDefined())
        {
            return 'MenuBigBand.getSmartphoneMainMenuHtmlFile Error Array m_html_name_smartphone_array is not set';
        }

        var n_smartphone_file_names = this.m_html_name_smartphone_array.length;

        if (i_main_menu_index < 0 || i_main_menu_index > n_smartphone_file_names - 1)
        {
            return 'MenuBigBand.getSmartphoneMainMenuHtmlFile Error Index= ' + i_main_menu_index.toString();
        }
        else
        {
            return this.m_html_name_smartphone_array[i_main_menu_index];
        }

    } // getSmartphoneMainMenuHtmlFile
    
    // Returns true if HTML file names for smartphones are defined
    smartphoneHtmlFilesDefined()
    {
        if (m_html_name_smartphone_array == null)
        {
            return false;
        }
        else
        {
            return true;
        }

    } // smartphoneHtmlFilesDefined

    // Get the option number for a given HTML file name (web page)
    getMainMenuSelectOptionNumber(i_html_file)
    {
        var ret_number = -1;

        var html_file = MenuBigBand.getUrlFileName(i_html_file);

        var n_file_names = this.m_html_name_desktop_array.length;

        for (var index_name=0; index_name < n_file_names; index_name++)
        {
            var current_name = this.m_html_name_desktop_array[index_name];

            if (this.currentWebPageIsForSmartphone() && this.m_html_name_smartphone_array != null)
            {
                current_name = this.m_html_name_smartphone_array[index_name];
            }

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
        var file_name = this.getDesktopMainMenuHtmlFile(i_main_menu_index);

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
        this.m_el_div_menu_desktop = document.getElementById(this.m_id_div_menu_desktop);

        this.m_el_div_menu_smartphone = document.getElementById(this.m_id_div_menu_smartphone);

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
        var html_desktop_str = this.getHtmlDesktopString();

        if (this.m_el_div_menu_desktop != null)
        {
            this.m_el_div_menu_desktop.innerHTML = html_desktop_str; 
        }

        this.setNumberArray();

        var html_smartphone_str = this.getHtmlSmartphoneString();

        if (this.m_el_div_menu_smartphone != null)
        {
            this.m_el_div_menu_smartphone.innerHTML = html_smartphone_str; 

            var el_drop_down = document.getElementById(this.m_id_smartphone_drop_down);

            var select_option_number = this.getMainMenuSelectOptionNumber(MenuBigBand.getCurrentWebPage());
    
            el_drop_down.value = select_option_number;
        }
        
        this.setStyles();

    } // setControl    

    // Returns the current HTML file name (the current web page) without path
    static getCurrentWebPage()
    {
        return MenuBigBand.getUrlFileName(window.location.pathname);

    } // getCurrentWebPage

    // Returns the file name without path
    static getUrlFileName(i_url_path)
    {
        var ret_file_name = i_url_path;

        var index_last_slash = -9;

        for (var index_char=0; index_char < i_url_path.length; index_char++)
        {
            var current_char = i_url_path.substring(index_char, index_char + 1);

            if (current_char == '/')
            {
                index_last_slash = index_char;
            }
        }

        if (index_last_slash >= 0)
        {
            ret_file_name = i_url_path.substring(index_last_slash + 1);
        }

        return ret_file_name;
       
    } // getUrlFileName

    // Returns true if the current web page is for desktop
    currentWebPageIsForDesktop()
    {
        var ret_b_desktop = false;

        var n_names = this.m_html_name_desktop_array.length;

        var current_web_page = MenuBigBand.getCurrentWebPage();

        for (var index_name=0; index_name < n_names; index_name++)
        {
            var desktop_html = this.m_html_name_desktop_array[index_name];

            if (desktop_html == current_web_page)
            {
                ret_b_desktop = true;

                break;
            }

        }

        return ret_b_desktop;

    } // currentWebPageIsForDesktop

    // Returns true if the current web page is for smartphone
    currentWebPageIsForSmartphone()
    {
        var ret_b_smartphone = false;
		
		if (this.m_html_name_desktop_array == null)
		{
			return ret_b_smartphone;
		}

        var n_names = this.m_html_name_desktop_array.length;

        var current_web_page = MenuBigBand.getCurrentWebPage();

        for (var index_name=0; index_name < n_names; index_name++)
        {
            var smartphone_html = this.m_html_name_desktop_array[index_name];

            if (smartphone_html == current_web_page)
            {
                ret_b_smartphone = true;

                break;
            }

        }

        return ret_b_smartphone;

    } // currentWebPageIsForSmartphone
	
    // Set the styles for the desktop and smartphone menus
    setStyles()
    {
        this.setStylesDesktop();

        this.setStylesSmartPhone();

    } // setStyles

    // Set the styles for the desktop menu
    setStylesDesktop()
    {
        if (this.m_el_div_menu_desktop == null)
        {
            return;
        }

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
            
            button_el.style.color = this.m_desktop_button_pen_color;   

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
        if (this.m_el_div_menu_smartphone == null)
        {
            return;
        }

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

    // Check 
    checkContainerElementMenuDesktop()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_menu_desktop)
        {
            alert("MenuBigBand: HTML element with id= " + this.m_id_div_menu_desktop + " does not exist.");

            ret_b_check = false;
        }  

        return ret_b_check;

    } // checkContainerElementMenuDesktop    

    // Checks the dimension for a length: Height, width, ...
    checkDimensionInput(i_height_width)
    {
        var ret_px_check = true;

        var height_width_str = i_height_width.toString();

        var index_px= height_width_str.indexOf('px');

        if (index_px < 0)
        {
            alert("MenuBigBand error: Masse wie Breite und Höhe müssen als px eingeben werden. Eingabe '" + i_height_width + "' ist nicht erlaubt.");

            ret_px_check = false;
        }

        if (index_px >= 0)
        {
            var end_part_str = height_width_str.substring(index_px);

            if (end_part_str.length != 2)
            {
                alert("MenuBigBand error: Masse wie Breite und Höhe müssen müssen mit px enden. Eingabe '" + i_height_width + "' ist nicht erlaubt.");

                ret_px_check = false;
            }
        }

        if (index_px >= 0)
        {
            var start_part_str = height_width_str.substring(0, index_px);

            if (start_part_str.length == 0)
            {
                alert("MenuBigBand error: Eingabe '" + i_height_width + "' ohne Zahl ist nicht erlaubt.");

                ret_px_check = false;                
            }

            for (var index_char=0; index_char < start_part_str.length; index_char++)
            {
                var current_char = start_part_str.substring(index_char, index_char + 1);

                var current_char_ok = true;

                if (current_char == "0" ||
                    current_char == "1" ||
                    current_char == "2" ||
                    current_char == "3" ||
                    current_char == "4" ||
                    current_char == "5" ||
                    current_char == "6" ||
                    current_char == "7" ||
                    current_char == "8" ||
                    current_char == "9"   )
                {
                    current_char_ok = true;
                }
                else
                {
                    current_char_ok = false;
                }

                if (!current_char_ok)
                {
                    alert("MenuBigBand error: Für die Eingabe '" + i_height_width + "' muss '" + start_part_str + "' eine Zahl sein");

                    ret_px_check = false;     

                    break;
                }


            } // index_char

        } // index_px >= 0

        return ret_px_check;

    } // checkDimensionInput

    // Check input data to the constructor
    checkConstructorInputData()
    {
        if (this.currentWebPageIsForDesktop())
        {
            if (!this.checkContainerElementMenuDesktop())
            {
                return false;
            }
        }


// this.m_id_div_menu_desktop 
// this.m_id_div_menu_smartphone

        if (this.m_menu_name_array == null)
        {
            alert("MenuBigBand The input array of main menu names is null (not defined)");

            return false;
        }

        if (this.m_menu_name_array.length == 0)
        {
            alert("MenuBigBand The input array of main menu names is empty (no names are defined)");

            return false;
        }

        if (this.m_html_name_desktop_array == null)
        {
            alert("MenuBigBand The input array of desktop HTML file names is null (not defined)");

            return false;
        }

        if (this.m_html_name_desktop_array.length == 0)
        {
            alert("MenuBigBand The input array of desktop HTML file names is empty (no HTML file names are defined)");

            return false;
        } 

        if (this.m_html_name_desktop_array.length != this.m_menu_name_array.length)
        {
            alert("MenuBigBand The number of main menu names and the number of desktop HTML file names are not equal");

            return false;
        } 

        if (this.m_html_name_smartphone_array != null)
        {
            if (this.m_html_name_smartphone_array.length == 0)
            {
                alert("MenuBigBand The input array of smartphone HTML file names is empty, i.e. no HTML file names are defined. Please note that value null also is allowed");
    
                return false;
            } 
    
            if (this.m_html_name_smartphone_array.length != this.m_menu_name_array.length)
            {
                alert("MenuBigBand The number of main menu names and the number of smartphone HTML file names are not equal");
    
                return false;
            } 
    
        } // m_html_name_smartphone_array != null


    } // checkConstructorInputData

} // MenuBigBand


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Menu Big Band ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class DesktopSmartphone ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class for the handling of the device type, i.e. if desktop or smartphone
// Input data:
// Identity of the container <div> that displays the desktop content
// Identity of the container <div> that displays the smartphone content
// The name of the current web page defined by the HTML file name
class DesktopSmartphone
{
    // Creates the instance of the class
    constructor(i_id_div_container_desktop, i_id_div_container_smartphone, i_html_file_name) 
    {
        // Member variables
        // ================

        // The identity of the container <div> for the desktop containt
        this.m_id_div_container_desktop = i_id_div_container_desktop;

        // The identity of the container <div> for the smartphone content
        this.m_id_div_container_smartphone = i_id_div_container_smartphone;

        // Current HTML file name (current web page)
        this.m_html_file_name = i_html_file_name;     
        
        // The container <div> element for the desktop content
        this.m_el_div_container_desktop = null;

        // The container <div> element for the smartphone content
        this.m_el_div_container_smartphone = null;   

    } // constructor

} // DesktopSmartphone

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class DesktopSmartphone /////////////////////////////////////
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
        if (el_div_container_desktop_desktop != null)
        {
            el_div_container_desktop_desktop.style.display = 'block';
        }
        
        if (el_div_container_desktop_smartphone != null)
        {
            el_div_container_desktop_smartphone.style.display = 'none';
        }
    }
    else
    {
        if (el_div_container_desktop_desktop != null)
        {
            el_div_container_desktop_desktop.style.display = 'none';
        }
        
        if (el_div_container_desktop_smartphone != null)
        {
            el_div_container_desktop_smartphone.style.display = 'block';
        }
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