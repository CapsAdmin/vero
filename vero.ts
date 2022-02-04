import { Checkbox } from "@frontend/gui/components/interactive/checkbox"
/*

actions:
    shared:
        csv import
        json import

        csv export
        json export
        
        create short link

    client:
        scan barcode
        copy to clipboard
        create calendar event
        show install prompt
        open print
        set language
        set theme


    server:
        send email
        send sms

    */

type User = {
	id: string
	email: string
	first_name: string
	last_name: string
	last_logged_in: string
	phone: string
	profile_image: string
	profile_image_exist: boolean
}

type App = {
	version: string
	environment: string
}

interface Network {
	IsOnline(): boolean
	GetHostname(): string
}

interface User {
	static IsAuthenticated(): boolean
	static Login()
	static Logout()
}

interface System {
	GetBrowser(): string
	GetLanguage(): string
	GetOS(): string
}

interface Screen {
	GetScreenSize(): [number, number]
	IsFullscreen(): boolean
	GetOrientation(): string
}

interface Drawer {
	IsOpen(): boolean
}

interface Scheduler {}
/*
Layout:
    Container (god container, div)
    ViewContainer (can show and hide children)
    IFrame
    Tabs
    Bottom Navigation
    
    Popover / Modal
        fullscreen (bottom up)
        center

    


DataInput:
    TextEdit
    DatePicker
    TimePicker
    Checkbox
    Switch
    RadioButtons
    Select
    MultiSelect
    Slider
    DrawableCanvas
    RichTextEditor / Multiline Text Editor

Visuals:
    Text
    Icon
    Image
    Avatar
    Map
    PDF Reader
    CircularProgress (infinite and finite)
    LinearProgress(infinite and finite)
    Gauge


    */
