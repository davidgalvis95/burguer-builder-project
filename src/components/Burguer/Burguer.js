import BurguerIngredient from "./BurguerIngredient/BurguerIngredient";
import classes from './Burguer.module.css'

const burguer = (props) => {

    //Here is a way of transforming an object into an array of needed components
    //The Object.keys() creates an array of the keys of the Object that is passed in, in this case the ingredients object passed in the properties
    let transformedIngredients = Object.keys( props.ingredients ).map(ingredientKey =>{

        //Here we are creating an empty array of length = the length of the key in the Object ingredients e.g. "cheese : 2"
        //Also after mapping it, since we will not use any of its inner objects (because it's and empty array) we pass "_" which means
        //that we will iterate over an empty object of the array, but we'll also pass th index "i" to map it into the key generating an array of BurguerIngredients
        return [...Array(props.ingredients[ingredientKey])].map((_,index) =>{

            //here we are building an array of BurguerIngredient, this is why it's needed the key
            return <BurguerIngredient key={ingredientKey + index} type={ingredientKey}/>
        })
    //    The reduce operator is used to perform for example [[1,2],[3],[4,5]].reduce(...) = [1,2,3,4,5]
    }).reduce((accumulator,actualElement) =>{

        //if x=[a,b,c] and y=[1,2,3] then x.concat(y) = [a,b,c,1,2,3]
        return accumulator.concat(actualElement);

    //    The '[]' that is the seond argument of the reduce operator, means the starting point, that means that if the array is full
        //    of empty arrays, it will result in the same '[]' initial array
    },[])

    if(transformedIngredients.length ===0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    console.log(transformedIngredients);

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