class Food
{
    constructor()
    {
        this.foodstock = 0;
        this.lastfed;
        this.foodImage = loadImage("Milk.png");
        this.buttonPressed = false
    }
    getFoodStock()
    {
        return this.foodstock
    }
    updateFoodStock(foodS)
    {
        this.foodstock = foodS
    }
    deductFood()
    {
        if (this.foodstock > 0)
        {
            this.foodstock -= 1;
        }
    }
    getFeedTime(lastFed)
    {
        this.lastfed = lastFed
    }
    bedroom()
    {
        background(bg1, width/2, height/2)
    }
    garden()
    {
        background(bg2, width/2, height/2)
    }
    washroom()
    {
        background(bg4, width/2, height/2)
    }
    livingRoom()
    {
        background(bg3, width/2, height/2)
    }
    // sleep(milliseconds) {
    //     const date = Date.now();
    //     let currentDate = null;
    //     do {
    //         currentDate = Date.now();
    //     } while (currentDate - date < milliseconds);
    // }
    display()
    {
        console.log(this.buttonPressed)
        var x = 80;
        var y = 100;

        if (this.foodstock != 0)
        {
            for (var i = 0;i < this.foodstock; i++)
            {
                if (i%10 == 0)
                {
                    x = 80;
                    y += 50;
                }
                image(this.foodImage, x, y, 50, 50)
                x += 30;
            }
        }
    }
}




// if (this.buttonPressed)
//                 {
//                     image(this.foodImage, 200, 200, 50, 50)
//                     this.sleep(1000);
                    
//                 }
//                 else
//                 {