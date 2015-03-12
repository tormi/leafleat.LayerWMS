﻿(function (factory) {
    // Module systems magic dance, Leaflet edition
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
        // Browser globals
        if (typeof this.L === 'undefined')
            throw 'Leaflet must be loaded first!';
        // Namespace
        this.L.WMSLayer = this.L.wmsLayer = factory(this.L);
    }
}(function (L) {



// Module object
var wmsLayer = L.TileLayer.WMS.FeatureInfo = L.Layer.extend({                  
    
	statics:{ create :function (url, options) {return new L.TileLayer.WMS.FeatureInfo(url, options);}},
    //includes: L.Mixin.Events,    
    options:{
		crs:null, //Координатная система для слоя
		gutter:50, //Ширина отступа по краям изображения
		opacity: 1, //Прозрачнойсть изображения
		alt: '', //Описание к изображению
		loading:null, //Обработчик загрузки изображения
		//Картинка с ошибкой
		errorImg_url:'data:image/png;base64,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'
	},
	//Опции для GetFeatureInfo
	featureInfoOptions:
	{
		  ajax:null,
          propertyName: null,
          notFoundMessage:'No found data!',
          templateContent:null,
          classGroup:null,
		  classList:null
	},
	
	//Параметры по умолчанию	
	defaultWmsParams: {
		service: 'WMS',
		layers: null,
		version: '1.1.1',
		styles: ''		
	},
	
	//Параметры Wms для метода GetMap
	defaultParamsGetMap:{		 
        request: 'GetMap',        
		format: 'image/jpeg',
		transparent: false
	},
	
	//Параметры Wms для метода GetFeatureInfo
	defaultParamsGetFeatureInfo:{		 
        request: 'GetFeatureInfo',        
        info_format: 'text/html'
	},
		
	
	initialize: function(url,options,featureInfoOptions)
	{
		this._url = url;
		
		if(featureInfoOptions)
			this._replaceProperties(featureInfoOptions,this.defaultParamsGetFeatureInfo);
		
		this.updateOptions(options);	
		
		this._image = this._createImage();		
		debugger
    },
  onAdd: function(map){    
		this._map = map;
		this._updateCrs();
        // create a DOM element and put it into one of the map panes        
        map.getPanes().overlayPane.appendChild(this._image);

        // add a viewreset event listener for updating layer's position, do the latter
       // map.on('viewreset', this._reset, this);
		//map.on('moveend', this._moveend, this);
		//map.on('click',this._getFeatureInfoClick);   		
        this._reset();		
  },
  onRemove: function(map){  
    // remove layer's DOM elements and listeners
        map.getPanes().overlayPane.removeChild(this._image);
      //  map.off('click',this._getFeatureInfoClick);
		//map.off('viewreset', this._reset, this);
		//map.off('moveend', this._moveend, this);		
  },  
  
  getAttribution: function () {
		return this.options.attribution;
	},

	
 getEvents: function () {
		var events = {
			viewreset: this._reset,
			moveend: this._moveend,
			resize: this._resize,
			click: this._click
		};

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}
				
		return events;
	},
   
 
   
   //Обновление опций
   updateOptions:function(options){	   
 	    L.Util.setOptions(this,
							L.Util.extend({loading:this._loadingImage},options)
						 );		
									
		if(options)
		{
			this._replaceProperties(options,this.defaultWmsParams);
			this._replaceProperties(options,this.defaultParamsGetMap);
			this._replaceProperties(options,this.defaultParamsGetFeatureInfo);				
		
			if(options.GetFeatureInfo)		
				this.featureInfoOptions = L.Util.extend(this.featureInfoOptions,options.GetFeatureInfo);
		}
		
		this._wmsVersion = parseFloat(this.defaultWmsParams.version);			
		this._projectionKey = this._wmsVersion>= 1.3?'crs':'srs';		
		this._updateCrs();
		this._updateOpacity();		
				
		this.featureInfoOptions.ajax = this.featureInfoOptions.ajax?this.featureInfoOptions.ajax:this._ajax;
		
   },
   //Обновить координатную систему
   _updateCrs:function()
   {
	   this._crs=this.options.crs||(this._map&&this._map.options?this._map.options.crs:this._crs);
		
		if(this._crs)
			this.defaultWmsParams[this._projectionKey]=this._crs.code;
   },
   
   //Замена свойств, которые уже есть у приемника
	_replaceProperties: function(src,dst)
	{
		for (var p in src) {
			if(dst.hasOwnProperty(p))
				dst[p] = src[p];
			}
	},

	_createImage: function () {
		var img = L.DomUtil.create('img','leaflet-wms-layer leaflet-tile ' + (this._zoomAnimated ? 'leaflet-zoom-animated' : ''));		
		img.onselectstart = L.Util.falseFn;
		img.onmousemove = L.Util.falseFn;		
		img.onload  = L.bind(this.fire, this, 'load');
		img.onerror = L.bind(this.fire, this, 'loaderr');
		img.alt = this.options.alt;
		return img;
	},
	
   _updateOpacity: function () {
	   if(this._image)
			L.DomUtil.setOpacity(this._image, this.options.opacity);
	},
	_updateImageRectangle:function(img,point,size)
	{			    
		L.DomUtil.setPosition(img, point);
		img.style.width  = Math.round(size.x) + 'px';
		img.style.height = Math.round(size.y) + 'px';
	},
   
     //Обработчик загрузки изображения
    _loadingImage:function(end)
	{
		this._map.getContainer().style.cursor = !end?"progress":"default";
	}, 
   
    
    _reset: function (e) {
		this._update();	   
    },
	_moveend: function (e) {				 
	  if(!this._bounds.contains(this._map.getBounds()))
	  {		
		this._update();	  
	  }
    },
    _resize:function()
    { 
	   if(!this._bounds.contains(this._map.getBounds())||L.DomUtil.hasClass(this._image, 'leaflet-tile-loaded-error'))
	   {		
		 this._update();	  
	   }
    },
    _click:function(e){
	   this._getFeatureInfo(e.latlng);
    },

  _imageReady:function(img)
   {
	   var pane = this.getPane();	   
	   if(!(this._image===img))
	   {
		L.DomUtil.removeClass(this._image, 'leaflet-tile-loaded');
		L.DomUtil.removeClass(this._image, 'leaflet-tile-loaded-error');
		pane.removeChild(this._image);		
		L.DomUtil.addClass(img, 'leaflet-tile-loaded');		
		pane.appendChild(img);
		this._image_prev = this._image;
		this._image = img;
		this._updateOpacity();
	   }
   },
   
   _abortLoadImage:function(img)
   {
	 if(img.src&&img.src.length>0)
	 {
		L.DomUtil.removeClass(img, 'leaflet-tile-loaded');
		L.DomUtil.addClass(img, 'leaflet-tile');
		var ponload=img.onload,ponerror=img.onerror;
		img.onload=img.onerror=img.onabort=null;
		img.src='';
		img.onload=ponload;
		img.onerror=ponerror;
     }	
	 
   },
   
_update:function()
{		
    	
	var newImg = this._image_prev||this._createImage();
    //Сбросим загрузку изображения, если выполняется
	this._abortLoadImage(newImg);
	
    //Если в параметрах передана функции обработки загрузки изображения
	var loading=this.options.loading,loaderr=null,
		isLoading = typeof loading==='function',
		loaded = function()
		{ 			
			if(isLoading) 	
			{
				loading.call(this,true);
				this.off('load',loaded);
			}
			this._imageReady(newImg);
			this.off('loaderr',loaderr,this);
		};
	
	this.on('load',loaded,this);
	
	var gutter = this.options.gutter;
	
	loaderr=function(){
			debugger			
			//Если ширина канала больше 0, то уменьшим и попробуем снова
			if(gutter>0)
			{
				gutter = gutter>10?gutter-10:0;
				this._getMap(newImg,gutter);
			} 
			else
			{				
				newImg.src=this.options.errorImg_url;
				loaded.call(this);	
				L.DomUtil.addClass(newImg, 'leaflet-tile-loaded-error');				
			}						
		};
	this.on('loaderr',loaderr,this);	
		
	if(isLoading)	
		loading.call(this,false);	
	
	this._getMap(newImg);		
}
,
	
	_animateZoom: function (e) {
		var topLeft = this._map._latLngToNewLayerPoint(this._bounds.getNorthWest(), e.zoom, e.center),
		    size = this._map._latLngToNewLayerPoint(this._bounds.getSouthEast(), e.zoom, e.center).subtract(topLeft),
		    offset = topLeft.add(size._multiplyBy((1 - 1 / e.scale) / 2));

		///L.DomUtil.setTransform(this._image, offset, e.scale);
	},
	
 _ajax:function ajax(url,type,success,error) {
 
    var context = this,
        request = new XMLHttpRequest(),		
		strCmp=function(o,uppercase){ 
		if(o instanceof string)
		{
			uppercase=uppercase||false;
			o = L.Util.trim(o);
			if(uppercase)
				o=o.toUpperCase();
					
			for (var i = 2; i < arguments.length; i++) 
			{
				var val = arguments[i];
				if(val instanceof string&&(val=(uppercase?L.Util.trim(val).toUpperCase():L.Util.trim(val)))===o);
					return true;
			}
		}
		return false;},
        typeData=type&&type.Data?type.Data: (  strCmp(type,true,'GET','POST')?'text':L.Util.trim(type).toLowerCase() ),
        typeRequest=type&&type.Request?type.Request:( strCmp(type,true,'GET','POST')?type.toUpperCase():'GET');
        
    request.onreadystatechange = function()
	{
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data= request.responseText;
               if(typeData==='json'&&JSON&&JSON.parse)
               {
                   try{
                    data = JSON.parse(data);
                   }catch(e) 
                   {
                       error.call(context,e.toString());
                       return;
                   }
               }
                
                success.call(context,data);
                
            } else {
                error.call(context, "error");
            }
        }
    };
    request.open(typeRequest, url);
    request.send();           
   },
		
	//Загрузка изображения,
	_getMap:function(img,gutter)
	{		  
		var  pad = function(bufferRatio,bounds)
			{
				var heightBuffer = bounds.max.y - bounds.min.y;
				widthBuffer = bounds.max.x - bounds.min.x;
				return new L.Bounds([bounds.min.x-widthBuffer,bounds.min.y-heightBuffer],[bounds.max.x+widthBuffer,bounds.max.y+heightBuffer])
			};
			
		 var map = this._map,
			 zoom=map.getZoom(),
			 crs = this._crs,
			 boundsPixelMap = map.getPixelBounds(),			
			 boundsLatLng = map.getBounds().pad((gutter||this.options.gutter)/100),
			 boundsLatLng = L.latLngBounds(map.wrapLatLng(boundsLatLng.getSouthWest()), map.wrapLatLng(boundsLatLng.getNorthEast())),
			 //boundsPixel = new L.Bounds(map.project(boundsLatLng.getSouthWest()),map.project(boundsLatLng.getNorthEast())),		
			 boundsPixel = new L.Bounds(map.latLngToLayerPoint(boundsLatLng.getNorthWest()),map.latLngToLayerPoint(boundsLatLng.getSouthEast()))			 
			 se = crs.project(boundsLatLng.getSouthEast()),
			 nw = crs.project(boundsLatLng.getNorthWest()),
			 sizeWms=boundsPixel.getSize().round(),			
			 mapPane = map.getPane('mapPane'),
			 point = L.point(boundsPixel.min.x-boundsPixelMap.min.x,boundsPixel.min.y-boundsPixelMap.min.y).round(),
			 offsetMap = L.DomUtil.getPosition(mapPane),
			 pointImg = L.point(point.x,point.y);
			
					
			
		//Границы области для загрузки с отступом
		this._bounds = boundsLatLng;
		
		
		//Установим положение изображения и его размер
		this._updateImageRectangle(img,boundsPixel.min,sizeWms);	
		debugger
		var requestParams = L.extend({},		
		this.defaultWmsParams,
		this.defaultParamsGetMap,
		{   
			width:  sizeWms.x,
			height: sizeWms.y
		}
		);			

		/*
		var crs_bounds = crs.projection.bounds;
		requestParams.bbox = [
							Math.max(crs_bounds.min.x,min.x),
							Math.max(crs_bounds.min.y,min.y),
							Math.min(crs_bounds.max.x,max.x),
							Math.min(crs_bounds.max.y,max.y)
							].join(',');
		*/					
		requestParams.bbox = (this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ?  [se.y, nw.x, nw.y, se.x] : [nw.x, se.y, se.x, nw.y]).join(',');
			
		//Загрузка изображения
		img.src=this._url +L.Util.getParamString(requestParams, this._url, this.options.uppercase);
	},
  
  
  
  
   _getFeatureInfo: function(latlng)
    {    
        var map = this._map,
			params=this.featureInfoOptions,
            templateContent = params.templateContent,
            propertyName= params.propertyName,
            info_format=this.defaultParamsGetFeatureInfo.info_format,			
            point = map.latLngToContainerPoint(latlng, map.getZoom()),            
			size = map.getSize(),
            bounds = map.getBounds(),
			nw = this._crs.project(bounds.getNorthWest()),
			se = this._crs.project(bounds.getSouthEast());

		//Если не указан шаблон, и есть указанные свойства, то сгенерируем шаблон на основании списка свойств
        if((!templateContent||templateContent.length==0)&&propertyName&&propertyName.length>0)
		{        
			templateContent = '';
			debugger
			var parts = propertyName.split(/,/);
			for (var p=0;p<parts.length;p++) 
				templateContent += '<p>{'+parts[p]+'}</p>';
		}

      //Если указан шаблон, то сменим формат ответа на JSON
       info_format=templateContent&&info_format!='application/json'?'application/json':info_format;                
		           
		//Параметры запроса к WMS/GetFeatureInfo 
		var requestParams = L.extend(
			{   
				info_format:info_format,
				query_layers:this.defaultWmsParams.layers||this.defaultWmsParams.layers,
				width:  size.x,
				height: size.y
			},
			this.defaultWmsParams,
			this.defaultParamsGetFeatureInfo			
		);		
 
		requestParams.bbox = (this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ?  [se.y, nw.x, nw.y, se.x] : [nw.x, se.y, se.x, nw.y]).join(',');
		requestParams[this._wmsVersion >= 1.3?'i':'x']=point.x;
		requestParams[this._wmsVersion >= 1.3?'j':'y']=point.y;
	
	   

		//До параметры стилей при генерации HTML
		if(info_format==='text/html')
		{
			if(params.classGroup) requestParams.classGroup=params.classGroup;
			if(params.classList) requestParams.classList=params.classList;          
		}

    //Ссылка на запрос информации к WMS        
		var urlFeatureInfo=this._url + L.Util.getParamString(requestParams, this._url, true);
       
        var showResult=function(data){
            var prepareTemplateData=function(src){
                var dst = {};               
                for(var p in src)
                    if(src.hasOwnProperty(p))
                    dst[p]= typeof src[p]==='undefined'||!src[p]?'':src[p];
                return dst;
            };
            
            if(typeof data != 'string')
            {
                var features = data&&data.features&&data.features.length>0?data.features:data;
                data=null;
                if(features instanceof Array&&templateContent)
                {                           
                      html='';
                      for(var f in features)
                      {              
                          var feature=features[f];
                          var templateData = prepareTemplateData(feature.properties?feature.properties:feature);                         
                          html = html+ '<div>'+L.Util.template(templateContent, templateData)+'</div>';
                      }
                      data=html;                      
                }
            }
            
            //Если данные пустые, то подставим сообщение об отсутствие данных
            data = !data||data.length==0?('<div>'+(params.notFoundMessage||'No found data!')+'</div>'):data;
            
            //Покажем баллун с информацией
             L.popup()
            .setLatLng(latlng)
            .setContent(data)
            .openOn(map);
        };
        
        var ajax=params.ajax||this._ajax;
        //Запросим данные
        ajax(
             urlFeatureInfo,
             {Request:'GET',Data:(requestParams.info_format==='application/json'?'json':'text')},
             function(data)
             {
                 showResult(data);
             },
             function(error){
             });              
    }
});

L.wmsLayer=function() { return L.WMSLayer.create.apply(this,arguments);};
L.tileLayer.wms.featureInfo=function() { return L.TileLayer.WMS.FeatureInfo.create.apply(this,arguments);};

return wmsLayer;

}));