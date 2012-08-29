/* Slider Slide 
================================================== */

if (typeof VMM.Slider != 'undefined') {
	VMM.Slider.Slide = function(d, _parent, parent_config) {
		
		var config, $media, $text, $slide, $wrap, element, c,
			data		= d,
			slide		= {},
			element		= "",
			media		= "",
			loaded		= false,
			preloaded	= false,
			is_skinny	= false,
			_enqueue	= true,
			_removeque	= false,
			_id			= "slide_",
			timer		= {pushque:"", render:"", relayout:"", remove:"", skinny:false},
			times		= {pushque:500, render:100, relayout:100, remove:30000};
		
		_id				= _id + data.uniqueid;
		this.enqueue	= _enqueue;
		this.id			= _id;
        _tmpl           = "${text}",
		
		element		=	VMM.appendAndGetElement(_parent, "<div>", "slider-item");
		c = {slide:"", text: "", media: "", media_element: "", layout: "content-container layout", has: { headline: false, text: false, media: false }};
		
        if (typeof parent_config != 'undefined') {
            config = parent_config;
        } else {
            config = {
                useTmpl : false,
                hasTmpl : false,
            }
        }

        if (config.useTmpl && typeof(jQuery) != 'undefined' && typeof(jQuery.tmpl) != 'undefined') {
            if (!$.template["__slide_tmpl__"]) {
                var tmplToComp = _tmpl;
                if (typeof(config.tmpl) != 'undefined' && config.tmpl.length > 0) {
                    tmplToComp = config.tmpl;
                }
                $.template("__slide_tmpl__", tmplToComp);
            }
            config.hasTmpl = true
        }
		/* PUBLIC
		================================================== */
		this.show = function(skinny) {
			_enqueue = false;
			timer.skinny = skinny;
			_removeque = false;
			clearTimeout(timer.remove);
			
			if (!loaded) {
				if (preloaded) {
					clearTimeout(timer.relayout);
					timer.relayout = setTimeout(reloadLayout, times.relayout);
				} else {
					render(skinny);
				}
			}
		};
		
		this.hide = function() {
			if (loaded && !_removeque) {
				_removeque = true;
				clearTimeout(timer.remove);
				timer.remove = setTimeout(removeSlide, times.remove);
			}
		};
		
		this.clearTimers = function() {
			//clearTimeout(timer.remove);
			clearTimeout(timer.relayout);
			clearTimeout(timer.pushque);
			clearTimeout(timer.render);
		};
		
		this.layout = function(skinny) {
			if (loaded && preloaded) {
				reLayout(skinny);
			}
		};
		
		this.elem = function() {	
			return element;
		};
		
		this.position = function() {
			return VMM.Lib.position(element);
		};
		
		this.leftpos = function(p) {
			if(typeof p != 'undefined') {
				VMM.Lib.css(element, "left", p);
			} else {
				return VMM.Lib.position(element).left
			}
		};
		
		this.animate = function(d, e, p) {
			VMM.Lib.animate(element, d, e, p);
		};
		
		this.css = function(p, v) {
			VMM.Lib.css(element, p, v );
		}
		
		this.opacity = function(p) {
			VMM.Lib.css(element, "opacity", p);	
		}
		
		this.width = function() {
			return VMM.Lib.width(element);
		};
		
		this.height = function() {
			return VMM.Lib.height(element);
		};
		
		this.content_height = function () {
			var ch = VMM.Lib.find( element, ".content")[0];
			
			if (ch != 'undefined' && ch != null) {
				return VMM.Lib.height(ch);
			} else {
				return 0;
			}
		}
		
		/* PRIVATE
		================================================== */
		var render = function(skinny) {
			trace("RENDER " + _id);
			
			loaded = true;
			preloaded = true;
			timer.skinny = skinny;
			
            if (config.hasTmpl) {
                buildSlideFromTmpl();
            } else {
			    buildSlide();
            }
			
			//clearTimeout(timer.pushque);
			clearTimeout(timer.render);
			//timer.pushque = setTimeout(VMM.ExternalAPI.pushQues, times.pushque);
			
		};
		
		var removeSlide = function() {
			//VMM.attachElement(element, "");
			trace("REMOVE SLIDE TIMER FINISHED");
			loaded = false;
			VMM.Lib.detach($text);
			VMM.Lib.detach($media);
			
		};
		
		var reloadLayout = function() {
			loaded = true;
			reLayout(timer.skinny, true);
		};
		
		var reLayout = function(skinny, reload) {
			if (c.has.text)	{
				if (skinny) {
					if (!is_skinny || reload) {
						VMM.Lib.removeClass($slide, "pad-left");
						VMM.Lib.detach($text);
						VMM.Lib.detach($media);
						VMM.Lib.append($slide, $text);
						VMM.Lib.append($slide, $media);
						is_skinny = true;
					} 
				} else {
					if (is_skinny || reload) {
						VMM.Lib.addClass($slide, "pad-left");
						VMM.Lib.detach($text);
						VMM.Lib.detach($media);
						VMM.Lib.append($slide, $media);
						VMM.Lib.append($slide, $text);
						is_skinny = false;
						
					} 
				}
			} else if (reload) {
				if (c.has.headline) {
					VMM.Lib.detach($text);
					VMM.Lib.append($slide, $text);
				}
				VMM.Lib.detach($media);
				VMM.Lib.append($slide, $media);
			}
		}
		
        var buildSlideFromTmpl = function() {
            trace("BUILDSLIDE FROM TMPL");
            $wrap = VMM.appendAndGetElement(element, "<div>", "content");
            $.tmpl('__slide_tmpl__', data).appendTo($wrap);
        }

		var buildSlide = function() {
			trace("BUILDSLIDE");
            trace(data);
			$wrap	= VMM.appendAndGetElement(element, "<div>", "content");
			$slide	= VMM.appendAndGetElement($wrap, "<div>");
			
			/* DATE
			================================================== */
			if (data.startdate != null && data.startdate != "") {
				if (type.of(data.startdate) == "date") {
					if (data.type != "start") {
						var st	= VMM.Date.prettyDate(data.startdate);
						var en	= VMM.Date.prettyDate(data.enddate);
						var tag	= "";
						/* TAG / CATEGORY
						================================================== */
						if (data.tag != null && data.tag != "") {
							tag		= VMM.createElement("span", data.tag, "slide-tag");
						}
						
						if (st != en) {
							c.text += VMM.createElement("h2", st + " &mdash; " + en + tag, "date");
						} else {
							c.text += VMM.createElement("h2", st + tag, "date");
						}
					}
				}
			}
			
			/* HEADLINE
			================================================== */
			if (data.headline != null && data.headline != "") {
				c.has.headline	=	true;
				if (data.type == "start") {
					c.text		+=	VMM.createElement("h2", VMM.Util.linkify_with_twitter(data.headline, "_blank"), "start");
				} else { 
					c.text		+=	VMM.createElement("h3", VMM.Util.linkify_with_twitter(data.headline, "_blank"));
				}
			}
			
			/* TEXT
			================================================== */
			if (data.text != null && data.text != "") {
				c.has.text		=  true;
				c.text			+= VMM.createElement("p", VMM.Util.linkify_with_twitter(data.text, "_blank"));
			}
			
			if (c.has.text || c.has.headline) {
				c.text		= VMM.createElement("div", c.text, "container");
				//$text		=	VMM.appendAndGetElement($slide, "<div>", "text", c.text);
				
				$text		= VMM.appendAndGetElement($slide, "<div>", "text", VMM.TextElement.create(c.text));
				
			}
			
			/* SLUG
			================================================== */
			if (data.needs_slug) {
				
			}
			
			/* MEDIA
			================================================== */
			if (data.assets != null && data.assets.length > 0) {
                for (var index in data.assets) {
                    var asset = data.assets[index];
                    if (asset.media != null && asset.media != "") {
                        c.has.media	= true;
                        $media		= VMM.appendAndGetElement($slide, "<div>", "media", VMM.MediaElement.create(asset, data.uniqueid));
                    }
                }
			}
			
			/* COMBINE
			================================================== */
			if (c.has.text)	{ c.layout		+=	"-text"		};
			if (c.has.media){ c.layout		+=	"-media"	};

			if (c.has.text)	{
				if (timer.skinny) {
					VMM.Lib.addClass($slide, c.layout);
					is_skinny = true;
				} else {
					VMM.Lib.addClass($slide, c.layout);
					VMM.Lib.addClass($slide, "pad-left");
					VMM.Lib.detach($text);
					VMM.Lib.append($slide, $text);
				}
				
			} else {
				VMM.Lib.addClass($slide, c.layout);
			}
			
			
		};
		
	}
	
};
