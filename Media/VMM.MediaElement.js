/* MediaElement
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.MediaElement == 'undefined') {
	
	VMM.MediaElement = ({
		
		init: function() {
			return this;
		},
		
		loadingmessage: function(m) {
			return "<div class='loading'><div class='loading-container'><div class='loading-icon'></div>" + "<div class='message'><p>" + m + "</p></div></div></div>";
		},
		
		thumbnail: function(data, w, h, uid) {
			var _w		= 16,
				_h		= 24,
				_uid	= "";
				
			if (w != null && w != "") {_w = w};
			if (h != null && h != "") {_h = h};
			if (uid != null && uid != "") {_uid = uid};
			
			if (data.media != null && data.media != "") {
				var _valid		= true,
					mediaElem	= "",
					m			= VMM.MediaType(data.media); //returns an object with .type and .id
					
				// DETERMINE THUMBNAIL OR ICON
				if (data.thumbnail != null && data.thumbnail != "") {
					trace("CUSTOM THUMB");
					mediaElem		=	"<div class='thumbnail thumb-custom' id='" + uid + "_custom_thumb'><img src='" + data.thumbnail + "'></div>";
					return mediaElem;
				} else if (m.type == "image") {
					mediaElem		=	"<div class='thumbnail thumb-photo'></div>";
					return mediaElem;
				} else if (m.type	==	"unknown") {
					if (m.id.match("blockquote")) {
						mediaElem	=	"<div class='thumbnail thumb-quote'></div>";
					} else {
						mediaElem	=	"<div class='thumbnail thumb-plaintext'></div>";
					}
					return mediaElem;
				} else if (m.type	==	"website") {
					mediaElem		=	"<div class='thumbnail thumb-website'></div>";
					return mediaElem;
				} else {
					mediaElem = "<div class='thumbnail thumb-plaintext'></div>";
					return mediaElem;
				}
			} 
		},
		
		create: function(data, uid) {
			var _valid = false,
				//loading_messege			=	"<span class='messege'><p>" + VMM.master_config.language.messages.loading + "</p></span>";
				loading_messege			=	VMM.MediaElement.loadingmessage(VMM.master_config.language.messages.loading + "...");
			
			if (data.media != null && data.media != "") {
				var mediaElem = "", captionElem = "", creditElem = "", _id = "", isTextMedia = false, m;
				
				m = VMM.MediaType(data.media); //returns an object with .type and .id
				m.uid = uid;
				_valid = true;
				
			// CREDIT
				if (data.credit != null && data.credit != "") {
					creditElem			=	"<div class='credit'>" + VMM.Util.linkify_with_twitter(data.credit, "_blank") + "</div>";
				}
			// CAPTION
				if (data.caption != null && data.caption != "") {
					captionElem			=	"<div class='caption'>" + VMM.Util.linkify_with_twitter(data.caption, "_blank") + "</div>";
				}
			// IMAGE
				if (m.type				==	"image") {
					if (m.id.match("https://")) {
						m.id = m.id.replace("https://","http://");
					}
					mediaElem			=	"<div class='media-image media-shadow'><img src='" + m.id + "' class='media-image'></div>";
				} else if (m.type		==	"unknown") { 
					trace("NO KNOWN MEDIA TYPE FOUND TRYING TO JUST PLACE THE HTML"); 
					isTextMedia			=	true;
					mediaElem			=	"<div class='plain-text'><div class='container'>" + VMM.Util.properQuotes(m.id) + "</div></div>";
			// WEBSITE
				} else if (m.type		==	"website") { 
					//mediaElem			=	"<div class='media-shadow'><iframe class='media-frame website' frameborder='0' autostart='false' width='100%' height='100%' scrolling='yes' marginheight='0' marginwidth='0' src='" + m.id + "'></iframe></div>";
					//mediaElem			=	"<a href='" + m.id + "' target='_blank'>" + "<img src='http://api.snapito.com/free/lc?url=" + m.id + "'></a>";
					
					mediaElem			=	"<div class='media-shadow website'><a href='" + m.id + "' target='_blank'>" + "<img src='http://api1.thumbalizr.com/?url=" + m.id.replace(/[\./]$/g, "") + "&width=300' class='media-image'></a></div>";
					
			// NO MATCH
				} else {
					trace("NO KNOWN MEDIA TYPE FOUND");
					trace(m.type);
				}
				
			// WRAP THE MEDIA ELEMENT
				mediaElem				=	"<div class='media-container' >" + mediaElem + creditElem + captionElem + "</div>";
			// RETURN
				if (isTextMedia) {
					return "<div class='text-media'><div class='media-wrapper'>" + mediaElem + "</div></div>";
				} else {
					return "<div class='media-wrapper'>" + mediaElem + "</div>";
				}
				
			};
			
		}
		
	}).init();
}
