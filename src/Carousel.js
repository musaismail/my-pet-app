import { Component } from "react";
 

class Carousel extends Component{
constructor(){
super()
this.state={active:0}
}
static defaultProps = {
 images: ['http://pets-images.dev-apis.com/pets/none.jpg']
}
handleClick = (event) => {
this.setState({
 active: + event.target.dataset.index
});
};

render(){
    const {active} = this.state;
    const {images} = this.props;
    return(
        <div className="carousel">
         <img src={images[active]} alt='animal'/>
         <div className="carousel-smaller">
           {images.map((photo, index)=>(
            <img
            key={photo}
            src={photo}
            className={index === active ? "active" : ""}
            data-index={index}
            alt="animal thumbnail"
            onClick={this.handleClick}
            />
           ))}
           </div>
           </div>
           )}
    
}




export default Carousel;