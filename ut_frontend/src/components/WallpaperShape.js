import classNames from 'classnames';

export default function ShapeGenerator(zIndex) {

    console.log(zIndex.zIndex)

    var style = {
        "zIndex": zIndex.zIndex,
        "clipPath": "polygon(" + 
            (Math.random()*100).toString() +"%" + (Math.random()*100).toString() +"%," + 
            (Math.random()*100).toString() +"%" + (Math.random()*100).toString() +"%," + 
            (Math.random()*100).toString() +"%" + (Math.random()*100).toString() +"%" + 
        ")",
        "position":"absolute"
        
    };


    return (
        <div className='wallpaperPolygon downWallpaper' style={style} />
        
    )
};