export const kitchenHacks = [
  {
    title:"Grate garlic before cooking",
    text:"Grate or crush fresh garlic at the start of prep. Breaking the cloves lets alliinase form allicin and other sulfur compounds before heat reduces enzyme activity. Use the grated garlic in a dressing or stir it into a sauce toward the end of cooking.",
    links:[["USDA garlic processing study","https://www.ars.usda.gov/research/publications/publication/?seqNo115=210815"],["Try garlic butter salmon","#recipe/garlic-butter-salmon"]]
  },
  {
    title:"Finish broccoli with mustard powder",
    text:"Chop the broccoli early, cook it, then toss it with a pinch of plain ground mustard seed just before serving. Cutting broccoli lets myrosinase start forming sulforaphane. Cooking can reduce the enzyme’s activity. In a human feeding study, adding mustard powder to cooked broccoli increased a marker of sulforaphane uptake.",
    links:[["Broccoli and mustard feeding study","https://onlinelibrary.wiley.com/doi/10.1002/mnfr.201700980"],["Broccoli prep study","https://pubmed.ncbi.nlm.nih.gov/29357241/"],["Try miso salmon & broccoli","#recipe/miso-salmon"]]
  },
  {
    title:"Give sliced mushrooms some sun",
    text:"Spread sliced white button mushrooms in a single layer in direct sunlight while you prep, then cook them. UV light turns some of their ergosterol into vitamin D2. A study measured an increase after 15 minutes under its specific conditions. The amount depends on the sunlight, mushroom, and cooking method. Check the label on UV-treated mushrooms if you want a declared amount.",
    links:[["Sunlight study","https://pubmed.ncbi.nlm.nih.gov/26314311/"],["Cooking and vitamin D retention","https://pubmed.ncbi.nlm.nih.gov/29548435/"],["Try mushroom ragù","#recipe/parmesan-polenta-mushroom-ragu"]]
  },
  {
    title:"Chill cooked rice or potatoes",
    text:"Refrigerate cooked rice, potatoes, or pasta in shallow containers soon after cooking. Chill them overnight at 40°F / 4°C or colder. Some starch becomes resistant as it cools, meaning it reaches the large intestine without being broken down. A small human study found more resistant starch and a smaller blood sugar rise with refrigerated, reheated rice. The effect varies by food and preparation.",
    extra:"For rice, aim to refrigerate it within an hour, use it within 24 hours, and reheat only the amount you’ll eat to 165°F / 74°C.",
    links:[["Cooked rice crossover study","https://pubmed.ncbi.nlm.nih.gov/26693746/"],["NHS rice cooling guidance","https://www.nhs.uk/live-well/eat-well/food-types/starchy-foods-and-carbohydrates/"],["U.S. reheating guidance","https://ask.fsis.usda.gov/article/How-do-I-reheat-leftovers-safely"],["Try shrimp & egg fried rice","#recipe/shrimp-fried-rice"]]
  },
  {
    title:"Use ground flaxseed",
    text:"Use ground flaxseed in yogurt, oats, or a smoothie. A spice grinder works for whole seeds. Human studies found better availability of the plant omega-3 ALA and lignan metabolites from milled seeds than from whole seeds. Store ground flaxseed sealed according to the package directions.",
    links:[["ALA absorption study","https://pubmed.ncbi.nlm.nih.gov/18689552/"],["Lignan absorption study","https://pubmed.ncbi.nlm.nih.gov/16317125/"],["Try Greek yogurt, oats & berries","#recipe/protein-yogurt-oats"]]
  },
  {
    title:"Simmer tomatoes with olive oil",
    text:"Simmer crushed tomatoes with a little extra-virgin olive oil, or stir oil into a tomato sauce. Cooking helps release lycopene from the tomato tissue, and fat helps with absorption. A small feeding study found higher blood lycopene after eating tomatoes cooked with olive oil.",
    links:[["Tomatoes and olive oil study","https://pubmed.ncbi.nlm.nih.gov/15927929/"],["Try pasta alla Norma","#recipe/pasta-alla-norma"]]
  },
  {
    title:"Add lemon to green tea",
    text:"Brew green tea, then squeeze in a lemon wedge. Citrus juice helped preserve more catechins, including EGCG, in a lab simulation of digestion. The size of any absorption benefit in people remains uncertain.",
    links:[["Tea and citrus digestion study","https://pubmed.ncbi.nlm.nih.gov/17688297/"]]
  }
];

// Menu rows show the listed serving, protein (g), calories, and sodium (mg).
export const proteinOrders = [
  {
    restaurant:"Panda Express",
    tip:"Start with Grilled Teriyaki Chicken. Pick Super Greens for a vegetable side or add Black Pepper Sirloin Steak for a second entrée. Ask for any extra sauce on the side.",
    items:{
      chicken:["Grilled Teriyaki Chicken","6.1 oz",38,280,610],
      steak:["Black Pepper Sirloin Steak","5.9 oz",17,200,560],
      beef:["Broccoli Beef","6.3 oz",17,190,600],
      stringBean:["String Bean Chicken Breast","5.6 oz",15,210,600],
      greens:["Super Greens","10 oz side",8,180,660]
    },
    builds:[
      ["Teriyaki chicken bowl with Super Greens",["chicken","greens"]],
      ["Plate with teriyaki chicken, sirloin steak, and Super Greens",["chicken","steak","greens"]]
    ],
    links:[["Panda Express nutrition & allergens","https://www.pandaexpress.com/nutritioninformation"],["Make a teriyaki chicken bowl","#recipe/teriyaki-chicken"]]
  },
  {
    restaurant:"California Fish Grill",
    tip:"Start with Grilled Tilapia or Grilled Chicken. The example counts one side. Add any second side or extra sauce to the estimate.",
    items:{
      chicken:["Grilled Chicken","Entrée",46,490,160],
      tilapia:["Grilled Tilapia","Entrée",43,280,290],
      mahi:["Mahi Mahi","Entrée",38,500,250],
      shrimp:["Giant Shrimp","Entrée",31,200,940],
      zucchini:["Rosemary Zucchini","1 side",5,130,240]
    },
    builds:[["Grilled tilapia with one side of rosemary zucchini",["tilapia","zucchini"]]],
    links:[
      ["Grilled Chicken","https://www.cafishgrill.com/products/chicken-breast"],
      ["Grilled Tilapia","https://www.cafishgrill.com/products/tilapia"],
      ["Mahi Mahi","https://www.cafishgrill.com/products/mahi-mahi"],
      ["Giant Shrimp","https://www.cafishgrill.com/products/giant-shrimp"],
      ["Rosemary Zucchini","https://www.cafishgrill.com/products/rosemary-zucchini"],
      ["Browse fish recipes","#meat/seafood/fish"]
    ]
  },
  {
    restaurant:"Chipotle",
    tip:"Start with chicken and black beans. Add fajita vegetables and salad greens. A second serving of chicken adds 32 g protein and 180 calories at the listed portion.",
    items:{
      chicken:["Chicken","4 oz",32,180,310],
      barbacoa:["Barbacoa","4 oz",24,170,530],
      steak:["Steak","4 oz",21,150,330],
      beans:["Black Beans","4 oz",8,130,210],
      fajita:["Fajita Vegetables","2 oz",1,20,150],
      greens:["Supergreens Salad Mix","3 oz",1,15,15]
    },
    builds:[
      ["Chicken salad with black beans and fajita vegetables",["greens","chicken","beans","fajita"]],
      ["Same salad with double chicken",["greens","chicken","chicken","beans","fajita"]]
    ],
    links:[["Chipotle U.S. nutrition chart","https://www.chipotle.com/content/dam/chipotle/menu/nutrition/US-Nutrition-Facts-Paper-Menu-3-2025.pdf?lv=true"],["Make a turkey & black bean bowl","#recipe/lean-turkey-taco-bowl"]]
  }
];
