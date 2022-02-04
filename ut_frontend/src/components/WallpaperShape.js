import classNames from 'classnames';

export default function ShapeGenerator(zIndex) {

    var r1 = Math.random()*100;
    var r2 = Math.random()*100;

    var style = {
        "zIndex": zIndex.zIndex,
        "clipPath": "polygon(" + 
            (Math.random()*100).toString() +"%" + (Math.random()*100).toString() +"%," + 
            (r1 - 2).toString() +"%" + (r2 - 2).toString() +"%," + 
            (Math.random()*100).toString() +"%" + (Math.random()*100).toString() +"%," + 
            (r1 + Math.random()*4).toString() +"%" + (r2 + Math.random()*4).toString() +"%" + 
        ")",
        "position":"absolute"
        
    };


    return (
        <div className='wallpaperPolygon downWallpaper' style={style} />
        
    )
};