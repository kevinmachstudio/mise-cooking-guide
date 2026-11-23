export const chainRestaurants = {
  "california-fish-grill": {name:"California Fish Grill",place:"United States",area:"us",chain:true,sources:[
    ["California Fish Grill menu","https://www.cafishgrill.com/collections/all"]]},
  panda: {name:"Panda Express",place:"United States",area:"us",chain:true,sources:[
    ["Panda Express menu","https://www.pandaexpress.com/menu"],
    ["Panda Express menu at Houston Intercontinental","https://assets.ctfassets.net/fwldykjthzos/3gzr1rwJg9sp3iB4j7z6cv/07d7d822717b03ca28394f2696132506/IAH-CCM-Panda_Express-Menu.pdf"]]}
};

export const chainRecipes = [
  {
    id:"garlic-butter-salmon",restaurant:"california-fish-grill",name:"Garlic Butter Salmon Plate",cuisine:"California-inspired",animal:"Seafood",time:35,active:15,servings:2,
    desc:"Salmon brushed with lemon-garlic butter, with rice and roasted Brussels sprouts.",
    inspiration:"California Fish Grill offers grilled Atlantic salmon and a garlic butter plate with rice and Brussels sprouts. This version cooks the salmon in a skillet.",
    menu:["Atlantic salmon on the menu","https://www.cafishgrill.com/products/atlantic-salmon"],
    items:[[340,"g","Salmon fillets"],[300,"g","Brussels sprouts"],[260,"g","Cooked rice"],[1,"tbsp","Neutral oil"],[2,"tbsp","Unsalted butter"],[2,"cloves","Garlic"],[1,"tbsp","Lemon juice"],[2,"tsp","Balsamic vinegar"],[1,"tsp","Honey"],[0.5,"tsp","Fine salt"],[0.25,"tsp","Ground black pepper"]],
    steps:[
      "Heat the oven to 425°F / 220°C. Halve the sprouts and toss with most of the oil and half the salt. Roast cut-side down for 18–22 minutes. Toss the browned sprouts with balsamic and honey.",
      "Pat salmon dry and season with remaining salt and black pepper. Heat the remaining oil in a skillet over medium-high. Cook skin-side down for 4–6 minutes, flip, and reduce the heat.",
      "Add butter and minced garlic to the pan. Baste the fish until the center reaches 145°F / 63°C. Take the pan off the heat and add lemon. Serve with warmed rice and the sprouts."
    ],
    swap:"Arctic char works in the same skillet. Broccoli makes a quicker side and usually roasts in 12–16 minutes.",
    store:"Pack salmon, rice, and sprouts in separate compartments. Reheat the salmon and rice covered. Re-crisp the sprouts separately."
  },
  {
    id:"dynamite-shrimp-bowl",restaurant:"california-fish-grill",name:"Dynamite Shrimp Bowl",cuisine:"California-inspired",animal:"Seafood",time:30,active:25,servings:2,
    desc:"Golden shrimp, warm rice, roasted corn, and a creamy chile-lime drizzle.",
    inspiration:"California Fish Grill lists a Dynamite Shrimp Bowl. This weeknight version shallow-fries starch-coated shrimp and uses a quick sriracha mayo.",
    menu:["Dynamite Shrimp Bowl on the menu","https://www.cafishgrill.com/products/dynamite-shrimp-bowl"],
    items:[[300,"g","Raw shrimp, peeled and deveined"],[280,"g","Cooked rice"],[100,"g","Corn kernels"],[100,"g","Tomatoes, diced"],[40,"g","Cornstarch"],[4,"tbsp","Neutral oil"],[3,"tbsp","Mayonnaise"],[2,"tsp","Sriracha"],[1,"tbsp","Lime juice"],[1,"tsp","Honey"],[0.25,"tsp","Fine salt"],[12,"g","Cilantro"]],
    steps:[
      "Mix mayo, sriracha, lime, and honey. Pat shrimp thoroughly dry and toss with salt and cornstarch. Warm the rice and char the corn in a dry skillet, then transfer it to a bowl.",
      "Add oil to the skillet over medium-high heat. Tap excess starch from shrimp and fry in one uncrowded layer, turning once, until crisp and opaque and pearly throughout. Drain on a rack.",
      "Divide rice between bowls. Add corn, tomato, and shrimp. Drizzle with sauce and finish with cilantro."
    ],
    swap:"For a lighter version, skip the starch and sear the shrimp in a little oil. Use a mild chile sauce in place of sriracha for less heat.",
    store:"Store the shrimp, rice, and sauce separately. Reheat the shrimp on a rack in a hot oven and add sauce at the table."
  },
  {
    id:"cajun-shrimp-tacos",restaurant:"california-fish-grill",name:"Cajun Shrimp Tacos",cuisine:"California-inspired",animal:"Seafood",time:30,active:25,servings:2,pieces:4,
    desc:"Cajun-butter shrimp tacos with corn, cabbage, quick-pickled onion, and spicy mayo.",
    inspiration:"California Fish Grill’s Cajun shrimp tacos pair shrimp with Cajun butter, roasted corn, dynamite sauce, and cabbage. This adapts those elements for a skillet.",
    menu:["Cajun Shrimp Taco Combo on the menu","https://www.cafishgrill.com/products/cajun-shrimp-taco-combo"],
    items:[[280,"g","Raw shrimp, peeled and deveined"],[4,"","Small flour tortillas"],[100,"g","Shredded cabbage"],[90,"g","Corn kernels"],[90,"g","Tomatoes, diced"],[65,"g","Red onion, sliced"],[2,"tbsp","Rice vinegar"],[1,"tsp","Sugar"],[1,"tbsp","Unsalted butter"],[2,"tsp","Cajun seasoning"],[3,"tbsp","Mayonnaise"],[2,"tsp","Sriracha"],[1,"tbsp","Lime juice"],[10,"g","Cilantro"]],
    steps:[
      "Toss onion with vinegar and sugar. Let it sit while everything else cooks. Stir mayo, sriracha, and lime juice together.",
      "Char corn in a dry skillet and set it aside. Pat shrimp dry, toss with Cajun seasoning, then sear in butter over medium-high until opaque and pearly throughout, about 2 minutes per side depending on size.",
      "Warm tortillas in a clean pan. Fill with cabbage, shrimp, corn, tomato, drained onion, and cilantro. Spoon over the spicy mayo."
    ],
    swap:"Use small corn tortillas or Cajun-seasoned strips of firm white fish. Cook fish to 145°F / 63°C.",
    store:"Refrigerate cooked shrimp, toppings, and sauce in separate containers. Warm the shrimp and tortillas just before assembly."
  },
  {
    id:"panda-orange-chicken",restaurant:"panda",name:"Crispy Orange Chicken",cuisine:"Chinese American-inspired",animal:"Chicken",time:40,active:30,servings:4,
    desc:"Crisp chicken thighs tossed in a sticky orange, ginger, and vinegar glaze.",
    inspiration:"The Original Orange Chicken is a Panda Express signature. This home version uses fresh orange juice and zest with skillet-fried chicken.",
    items:[[600,"g","Chicken thighs, boneless and skinless"],[1,"egg","Eggs"],[70,"g","Cornstarch, divided"],[40,"g","All-purpose flour"],[5,"tbsp","Neutral oil, plus more as needed"],[150,"mL","Orange juice"],[1,"tsp","Orange zest"],[3,"tbsp","Brown sugar"],[2,"tbsp","Rice vinegar"],[1,"tbsp","Soy sauce"],[2,"cloves","Garlic"],[1,"tsp","Ginger"],[0.5,"tsp","Dried chile flakes"],[2,"","Scallions"]],
    steps:[
      "Cut chicken into bite-size pieces and toss with beaten egg. Set aside a tablespoon of cornstarch for the sauce. Mix remaining starch with the flour, then coat each piece and shake off excess.",
      "Heat a thin layer of oil in a skillet over medium-high. Fry in batches, turning when golden, until crispy and 165°F / 74°C inside. Drain on a rack.",
      "In a clean pan, simmer orange juice, zest, sugar, vinegar, soy sauce, minced garlic, ginger, and chile for 2 minutes. Whisk reserved starch with a tablespoon of cold water and stir into the bubbling sauce. Cook until glossy.",
      "Toss the chicken in the glaze immediately before serving. Top with sliced scallions."
    ],
    swap:"Use cubed chicken breast if preferred. Replace half the chile flakes with extra orange zest for a milder version.",
    store:"Refrigerate the chicken and sauce separately if making ahead. Re-crisp the chicken in the oven before tossing with warmed sauce."
  },
  {
    id:"panda-string-bean-chicken",restaurant:"panda",name:"String Bean Chicken Breast",cuisine:"Chinese American-inspired",animal:"Chicken",time:25,active:20,servings:2,
    desc:"Thin chicken cutlets and crisp green beans in a light ginger-soy glaze.",
    inspiration:"Panda Express serves String Bean Chicken Breast. This home version cooks the beans and chicken in the same skillet in separate batches.",
    items:[[330,"g","Chicken breast, boneless and skinless"],[250,"g","Green beans"],[80,"g","Yellow onion"],[75,"mL","Unsalted chicken stock"],[1,"tbsp","Soy sauce"],[1,"tbsp","Oyster sauce"],[1,"tsp","Sugar"],[2,"tsp","Cornstarch, divided"],[2,"cloves","Garlic"],[2,"tsp","Ginger"],[1,"tbsp","Neutral oil"]],
    steps:[
      "Slice chicken thinly across the grain and toss with half the starch and a little of the soy sauce. Trim and halve beans, slice the onion, and whisk stock, remaining soy sauce, oyster sauce, sugar, and the remaining starch.",
      "Heat oil in a wide skillet. Sear chicken in one layer, in batches if needed, until it reaches 165°F / 74°C. Transfer to a plate.",
      "Stir-fry beans and onion until crisp-tender. Add minced garlic and ginger for 30 seconds, pour in the sauce, and bubble until glossy. Return chicken and toss to coat."
    ],
    swap:"Use trimmed snap peas instead of green beans. Mushroom stir-fry sauce can stand in for oyster sauce.",
    store:"Store separately from rice if possible. Reheat covered in a skillet with a splash of water."
  },
  {
    id:"panda-chow-mein",restaurant:"panda",name:"Takeout-Style Chow Mein",cuisine:"Chinese American-inspired",animal:"Vegetables",time:25,active:20,servings:4,
    desc:"Wok-tossed wheat noodles with cabbage, celery, and a light soy-sesame finish.",
    inspiration:"Panda Express lists chow mein as a side. This skillet version uses readily available wheat noodles and keeps the vegetables crisp.",
    items:[[350,"g","Fresh chow mein noodles"],[220,"g","Shredded cabbage"],[100,"g","Celery"],[100,"g","Yellow onion"],[2,"cloves","Garlic"],[2,"tbsp","Neutral oil"],[2,"tbsp","Soy sauce"],[1,"tsp","Dark soy sauce"],[1,"tsp","Toasted sesame oil"],[0.5,"tsp","Sugar"]],
    steps:[
      "Prepare the noodles according to the package. Drain well. Slice the cabbage, celery, and onion into thin strips. Mix both soy sauces, sesame oil, and sugar.",
      "Heat neutral oil in a large skillet over medium-high. Stir-fry celery and onion for 2 minutes. Add cabbage and minced garlic, then cook until the cabbage wilts slightly.",
      "Add the noodles and sauce and toss over high heat until hot and evenly coated. Cook in two batches if the pan is crowded."
    ],
    swap:"Use cooked thin wheat noodles or spaghetti. For a soy-forward color without dark soy sauce, add an extra splash of light soy sauce to taste.",
    store:"Refrigerate the cooled noodles promptly. Reheat in a covered skillet with a spoonful of water, then uncover and toss to evaporate excess moisture."
  }
];
