// decorating a method
function sayMeow(
    target, // The entire class we're decorating
    name, // Name of the method we're decorating
    descriptor // Access to the actual method
) {
    const fn = descriptor.value;

    descriptor.value = (name) => {
        fn.call(target, `${name} says "meow".`);
    };
}

// decorating entire class
function feedCat(fedRecently = false) {
    return function(target) {
        target.prototype.isHungry = !fedRecently;
    }
}

@feedCat(true)
class Cat {
    @sayMeow
    printCat(name) {
        console.log(name);
    }
}
