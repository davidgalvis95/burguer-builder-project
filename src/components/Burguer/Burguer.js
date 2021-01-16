import BurguerIngredient from "./BurguerIngredient/BurguerIngredient";
import classes from './Burguer.module.css'

const burguer = (props) => {

    //Here is a way of transforming an object into an array of needed components
    //The Object.keys() creates an array of the keys of the Object that is passed in, in this case the ingredients object passed in the properties
    const transformedIngredients = Object.keys( props.ingredients ).map(ingredientKey =>{

        //Here we are creating an empty array of length = the length of the key in the Object ingredients e.g. "cheese : 2"
        //Also after mapping it, since we will not use any of its inner objects (because it's and empty array) we pass "_" which means
        //that we will iterate over an empty object of the array, but we'll also pass th index "i" to map it into the key generating an array of BurguerIngredients
        return [...Array(props.ingredients[ingredientKey])].map((_,i) =>{

            //here we are building an array of BurguerIngredient, this is why it's needed the key
            return <BurguerIngredient key={ingredientKey+i} type={ingredientKey}/>
        })
    })

    return (
        <div className={classes.Burguer}>
            <BurguerIngredient type="bread-top"/>
            {/*the final transformedIngredients looks something like [[salad],[bacon],[cheese, cheese],[meat, meat]]*/}
            {transformedIngredients}
            <BurguerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burguer;