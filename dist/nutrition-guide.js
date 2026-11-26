import { kitchenHacks, proteinOrders } from "./food-hacks.js";

const sources = {
  who:["WHO healthy diet guidance","https://www.who.int/news-room/fact-sheets/detail/healthy-diet"],
  sodium:["WHO sodium guidance","https://www.who.int/news-room/fact-sheets/detail/sodium-reduction"],
  labels:["FDA Nutrition Facts guide","https://www.fda.gov/food/nutrition-facts-label/how-understand-and-use-nutrition-facts-label"],
  activity:["CDC activity guidelines","https://www.cdc.gov/physical-activity-basics/guidelines/"],
  sleep:["CDC sleep guidance","https://www.cdc.gov/heart-disease/about/sleep-and-heart-health.html"],
  fish:["FDA fish and mercury advice","https://www.fda.gov/food/consumers/advice-about-eating-fish"],
  data:["USDA FoodData Central","https://fdc.nal.usda.gov/"],
  okinawa:["Willcox et al. · Okinawan diet","https://pubmed.ncbi.nlm.nih.gov/17986602/"],
  japan:["Kurotani et al. · Japanese Food Guide cohort","https://www.bmj.com/content/352/bmj.i1209"],
  aging:["Tessier et al. · Nature Medicine","https://www.nature.com/articles/s41591-025-03570-5"],
  demography:["Poulain and Herm · Blue Zone demography","https://pubmed.ncbi.nlm.nih.gov/40452754/"],
  brand:["Blue Zones project’s five places","https://www.bluezones.com/resources/what-are-blue-zones/"],
  validation:["The Gerontologist · age validation","https://academic.oup.com/gerontologist/article/65/12/gnaf246/8381533"],
  nicoya:["Rosero-Bixby · changing Nicoya cohorts","https://www.demographic-research.org/volumes/vol49/27/"],
  adventist:["Adventist Health Study-2","https://pubmed.ncbi.nlm.nih.gov/23836264/"],
  calerie:["Waziry et al. · Nature Aging","https://www.nature.com/articles/s43587-022-00357-y"],
  evening:["Bryan Johnson’s evening routine","https://blueprint.bryanjohnson.com/en-nz/blogs/news/bryan-johnsons-evening-routine"],
  morning:["Bryan Johnson’s 2026 morning routine","https://blueprint.bryanjohnson.com/en-ie/blogs/news/morning-routine"],
  workout:["Bryan Johnson’s workout routine","https://blueprint.bryanjohnson.com/en-ch/blogs/news/exercise-and-fitness-protocol-for-longevity"],
  blueprint:["Bryan Johnson’s published routine","https://blueprint.bryanjohnson.com/en-au/blogs/news/bryan-johnsons-protocol"],
  social:["Holt-Lunstad et al. · social relationships","https://pubmed.ncbi.nlm.nih.gov/20668659/"]
};

export const nutritionSections = [
  {id:"basics",label:"Nutrition basics",description:"Practical nutrition and longevity habits",terms:"protein fiber sodium salt nutrition label fats healthy aging seafood whole grains"},
  {id:"food-hacks",label:"Food hacks",description:"Seven ways to prep ingredients, with studies and recipes",terms:"grated garlic allicin broccoli mustard seed powder sulforaphane sun UV mushrooms vitamin D2 resistant starch chilled rice potatoes ground flaxseed omega ALA lycopene cooked tomatoes olive oil green tea lemon EGCG"},
  {id:"protein-orders",label:"Protein orders",description:"High-protein fast-food picks with calories and sodium",terms:"fast food takeout panda express california fish grill chipotle grilled teriyaki chicken tilapia quick ordering hacks macros"},
  {id:"research",label:"Research timeline",description:"Nutrition studies from 1997 to 2025",terms:"DASH PREDIMED fiber ultra processed CALERIE clinical trial cohort calorie restriction healthy aging"},
  {id:"blue-zones",label:"Blue Zones & Japan",description:"Okinawa, traditional foods, and longevity research",terms:"blue ocean zone Okinawa Japan Japanese hara hachi bu Sardinia Ikaria Nicoya Loma Linda sweet potato centenarians"},
  {id:"blueprint",label:"Bryan Johnson",description:"Blueprint habits and the evidence behind them",terms:"Bryan Brian Johnson Blueprint life hacks longevity sleep exercise strength tracking"}
];

const basics = [
  {title:"Build the meal around variety",text:"Start with a protein you like, add vegetables, and choose a satisfying starch. Beans, tofu, fish, eggs, and plain yogurt give you different ways to get protein. Use Mise’s estimates to compare meals and account for the amount you actually serve.",links:[sources.who,sources.data,["See meal-prep recipes","#restaurants/prep"]]},
  {title:"Make fiber easy to add",text:"WHO recommends at least 25 g of naturally occurring fiber a day for adults. Keep oats, beans, lentils, whole grains, and fruit around. Start with beans in a bowl, oats at breakfast, or adding lentils to soup.",links:[sources.who,["Greek yogurt, oats & berries","#recipe/protein-yogurt-oats"],["Salmon, lentils & lemon yogurt","#recipe/salmon-lentils-kale"]]},
  {title:"Compare sauces and packaged foods",text:"Check serving size first. If you use twice the labeled serving, double the listed sodium, protein, and calories. On U.S. labels, 5% Daily Value or less is low and 20% or more is high. Compare sodium for the same amount of soy sauce, stock, or packaged food.",links:[sources.labels,sources.sodium,["Scale a sauce","#sauces"]]},
  {title:"Choose fats and fish by the dish",text:"For day-to-day cooking, olive or canola oil, nuts, seeds, and fish give you unsaturated fat options. Alternate the fish you eat and check the FDA chart for lower-mercury choices, especially when shopping for pregnancy or children.",links:[sources.who,sources.fish,["Browse the fish directory","#meat/seafood/fish"]]},
  {title:"Put movement on the calendar",text:"CDC’s adult guideline is at least 150 minutes of moderate activity a week and strengthening on two days. A brisk walk after a meal can be one way to build up those minutes. Start with an amount that fits your ability and schedule.",links:[sources.activity]},
  {title:"Make sleep and meals easier to repeat",text:"Pick a regular wake time and leave time to wind down. Set aside a few minutes to plan meals and put one shared meal or walk on the calendar. Research links stronger social relationships with lower mortality, with room for other factors to explain some of the association.",links:[sources.sleep,sources.social,["Open This Week","#plan"]]}
];

const studies = [
  {year:"1997",type:"Controlled feeding trial",title:"DASH and blood pressure",finding:"A diet rich in produce and low-fat dairy lowered blood pressure over eight weeks in the DASH feeding trial.",context:"The trial measured blood pressure over the feeding period.",link:["Appel et al. · NEJM","https://www.nejm.org/doi/full/10.1056/NEJM199704173361601"]},
  {year:"2001",type:"Controlled feeding trial",title:"Sodium and the DASH pattern",finding:"Lowering sodium reduced blood pressure on both study diets. The largest reduction came from combining lower sodium with DASH.",context:"This was a controlled feeding comparison in adults with above-optimal blood pressure.",link:["Sacks et al. · NEJM","https://www.nejm.org/doi/full/10.1056/NEJM200101043440101"]},
  {year:"2007",type:"Historical diet and population data",title:"A look at older Okinawan cohorts",finding:"Researchers described historical Okinawan diets with sweet potatoes, vegetables, and soy foods and documented patterns of health in older people.",context:"Historical population data leave the effect of individual foods on lifespan unresolved.",link:sources.okinawa},
  {year:"2016",type:"Prospective cohort",title:"Japan’s Food Guide and mortality",finding:"Among Japanese adults followed over time, closer adherence to the national food guide was associated with lower total mortality.",context:"Diet was self-reported. The findings reflect a dietary pattern in this population.",link:sources.japan},
  {year:"2018",type:"Trial reanalysis",title:"Mediterranean-style eating and cardiovascular events",finding:"In the corrected PREDIMED report, Mediterranean-style groups given olive oil or nuts had fewer major cardiovascular events than the comparison group.",context:"Participants were at high cardiovascular risk, and the reanalysis addressed deviations from the original randomization.",link:["Estruch et al. · corrected NEJM report","https://www.nejm.org/doi/full/10.1056/NEJMoa1800389"]},
  {year:"2019",type:"Randomized crossover trial",title:"Ultra-processed meals in a controlled setting",finding:"Twenty adults ate more and gained weight during the two weeks on the ultra-processed menu in a controlled inpatient study.",context:"The comparison covered two specific menus and a short period. Processing spans a wide range of foods.",link:["Hall et al. · Cell Metabolism","https://pubmed.ncbi.nlm.nih.gov/31105044/"]},
  {year:"2023",type:"Randomized trial · biological marker",title:"Calorie restriction and a pace-of-aging marker",finding:"A CALERIE analysis reported a small change in one DNA-methylation measure of aging over two years.",context:"The effect on human lifespan is still unresolved. Individual calorie targets depend on a person’s needs.",link:sources.calerie},
  {year:"2025",type:"Long-term cohorts",title:"Midlife eating patterns and healthy aging",finding:"A study of more than 105,000 participants found that several eating patterns were associated with better odds of healthy aging after follow-up of up to 30 years. Patterns with more plant foods tended to do well.",context:"Healthy aging included physical, cognitive, and mental measures. These observational associations can reflect other lifestyle and social factors.",link:sources.aging}
];

const places = [
  {title:"Okinawa, Japan",text:"Studies of older Okinawan generations describe sweet potatoes, greens, and soy foods. The population and its food habits have changed over time.",links:[sources.okinawa]},
  {title:"Sardinia, Italy",text:"Researchers identified a cluster of exceptional longevity in specific Sardinian communities. Their analysis depends on the local population and the reliability of age records.",links:[sources.validation]},
  {title:"Ikaria, Greece",text:"Ikaria appears in the demographic literature as a historically validated area. Local age records, migration, and the population being compared matter when interpreting the findings.",links:[sources.demography]},
  {title:"Nicoya, Costa Rica",text:"Early work identified a survival advantage among older men in Nicoya. A later study found that this advantage diminished in more recent birth cohorts.",links:[sources.nicoya]},
  {title:"Loma Linda, California",text:"The popular Blue Zones project highlights the local Seventh-day Adventist community. Adventist Health Study-2 found associations between dietary patterns and mortality in its broader cohort across the U.S. and Canada.",links:[sources.brand,sources.adventist]}
];

const japaneseHabits = [
  {title:"Try an Okinawan-inspired plate",text:"Roast a sweet potato, add tofu or edamame, and serve with greens. This draws on foods documented in older Okinawan diets and is easy to make with what you have.",links:[sources.okinawa,["Braised tofu & edamame","#recipe/braised-tofu"]]},
  {title:"Build a Japanese-style meal with sides",text:"Pair rice or noodles and a protein such as fish or tofu with vegetables. Start with a measured spoon of miso or soy and use citrus, ginger, or dashi to add flavor.",links:[sources.japan,sources.who,["Japanese pantry","#pantry/japanese"],["Miso salmon & broccoli","#recipe/miso-salmon"]]},
  {title:"Pause and check how full you feel",text:"The Okinawan saying hara hachi bu is often translated as eating until about 80% full. Take it as a reminder to slow down and notice comfortable fullness. The percentage is a saying, and appetite and energy needs vary.",links:[["Blue Zones · Okinawan food traditions","https://www.bluezones.com/articles/okinawa-diet-eating-living-100/"]]},
  {title:"Give movement a regular cue",text:"Japan’s radio taisō pairs a short calisthenics routine with a familiar broadcast. Borrow the cue: do a few minutes of movement you enjoy after a regular event, such as morning tea.",links:[["Web Japan · radio calisthenics","https://web-japan.org/jvt/summary.html"],sources.activity]}
];

const blueprintHabits = [
  {title:"Keep a regular sleep schedule",text:"Johnson describes sleep as a priority and uses a deliberate evening wind-down. Pick a wake time you can keep and a repeatable cue to start winding down. CDC also recommends consistent bed and wake times.",links:[sources.evening,sources.sleep]},
  {title:"Build movement into your day",text:"Johnson’s published exercise routine includes strength and cardiovascular work. Start with your own manageable schedule, such as a brisk walk and strength sessions that suit your ability.",links:[sources.workout,sources.activity]},
  {title:"Make a few routines repeatable",text:"Johnson’s 2026 morning write-up describes simplifying his routine over time. For a kitchen version, pick two breakfasts and one lunch rotation. Prep the ingredients ahead and use the calendar to decide which meals to repeat.",links:[sources.morning,["Plan meals in This Week","#plan"]]}
];

function links(items) {
  return '<div class="health-links">' + items.map(([label,url])=>'<a href="' + url + '">' + label + '</a>').join("") + '</div>';
}
function cardGrid(items) {
  return '<div class="health-cards">' + items.map(item=>'<article class="health-card"><h3>' + item.title + '</h3><p>' + item.text + '</p>' +
    (item.extra ? '<p class="health-card-tip">' + item.extra + '</p>' : '') + links(item.links) + '</article>').join("") + '</div>';
}

function foodHacks() {
  return '<h2>Kitchen tricks worth trying</h2><p class="health-lead">Small changes to how you slice, cook, and serve everyday ingredients.</p>' + cardGrid(kitchenHacks);
}

function orderCard({restaurant,tip,items,builds,links:references}) {
  const format = value => value.toLocaleString("en-US");
  const rows = Object.values(items).map(([name,portion,protein,calories,sodium]) =>
    '<tr><th scope="row">' + name + '<small>' + portion + '</small></th><td>' + protein + ' g</td><td>' + format(calories) + '</td><td>' + format(sodium) + '</td></tr>'
  ).join("");
  const examples = builds.map(([name,choices]) => {
    const [protein,calories,sodium] = choices.reduce(([protein,calories,sodium],choice) => {
      const [, ,itemProtein,itemCalories,itemSodium] = items[choice];
      return [protein + itemProtein, calories + itemCalories, sodium + itemSodium];
    },[0,0,0]);
    return '<li><strong>' + name + '</strong><span>' + protein + ' g protein · ' + format(calories) + ' kcal · ' + format(sodium) + ' mg sodium</span></li>';
  }).join("");
  return '<article class="health-card order-card"><h3>' + restaurant + '</h3><p>' + tip + '</p>' +
    '<ul class="order-examples">' + examples + '</ul><table class="order-table" aria-label="' + restaurant + ' nutrition per listed serving">' +
    '<thead><tr><th scope="col">Item</th><th scope="col">Protein</th><th scope="col">Calories</th><th scope="col">Sodium (mg)</th></tr></thead><tbody>' + rows + '</tbody></table>' +
    links(references) + '</article>';
}

function orderingGuide() {
  return '<h2>High-protein takeout orders</h2><p class="health-lead">Compare protein, calories, and sodium in U.S. menu portions. Example totals add the listed components. Count any extra sides, dressings, sauces, or drinks separately.</p>' +
    '<div class="order-cards">' + proteinOrders.map(orderCard).join("") + '</div>';
}

function research() {
  return '<h2>What researchers measured, year by year</h2><p class="health-lead">Trials can test an intervention under defined conditions. Cohorts follow people over time and show associations. The outcome and the population matter in both.</p>' +
    '<ol class="evidence-timeline">' + studies.map(study=>'<li><span class="evidence-year">' + study.year + '</span><article><span class="evidence-type">' + study.type + '</span><h3>' + study.title + '</h3><p>' + study.finding + '</p><p class="evidence-context">' + study.context + '</p>' + links([study.link]) + '</article></li>').join("") + '</ol>';
}
function blueZones() {
  return '<h2>Blue Zones and Japanese food traditions</h2><p class="health-lead">The Blue Zones label describes places studied for unusually high longevity. A 2025 demographic review recognizes four historically validated areas. The popular project also highlights Loma Linda. Comparing communities requires attention to birth records, migration, and which generations were studied.</p>' +
    links([sources.demography,sources.brand]) + cardGrid(places) +
    '<h2 class="health-subhead">Japanese and Okinawan ideas for dinner</h2>' + cardGrid(japaneseHabits);
}
function blueprint() {
  return '<h2>Bryan Johnson’s routine and everyday habits</h2><p class="health-lead">Blueprint is a commercial brand that publishes Johnson’s account of his own habits and measurements. Use public-health guidance for sleep, movement, and nutrition targets.</p>' +
    cardGrid(blueprintHabits) +
    '<aside class="health-evidence-note"><h3>Read longevity claims by outcome</h3><p>Blood tests and aging scores measure specific things. The CALERIE trial found a small shift in one aging marker over two years. Its effect on human lifespan remains unresolved. Prescription drugs and supplements are decisions to discuss with a clinician.</p>' +
    links([sources.blueprint,sources.calerie,["National Institute on Aging · CALERIE summary","https://www.nia.nih.gov/news/cutting-calories-may-slow-pace-aging-healthy-adults"]]) + '</aside>';
}

export function nutritionPage(section) {
  const active = nutritionSections.find(item=>item.id === section)?.id ?? "basics";
  const body = {basics:()=>'<h2>Habits you can use this week</h2>' + cardGrid(basics),"food-hacks":foodHacks,"protein-orders":orderingGuide,research,"blue-zones":blueZones,blueprint};
  return '<section class="health-hero"><div class="wrap health-hero-inner"><div><h1>Nutrition &amp; longevity</h1><p>Research on healthy aging, food traditions from Okinawa and beyond, and habits you can use at home.</p></div><img src="assets/nutrition-guide.webp" alt="Sweet potatoes, greens, tofu, and grains in a Japanese-inspired meal" width="650" height="488"></div></section>' +
    '<section class="wrap page-body health-body"><nav class="pills health-nav" aria-label="Nutrition and longevity topics">' + nutritionSections.map(item=>'<a href="#nutrition' + (item.id === "basics" ? "" : "/" + item.id) + '"' + (item.id === active ? ' aria-current="page"' : '') + '>' + item.label + '</a>').join("") + '</nav><div id="health-topic" class="health-topic">' + body[active]() + '</div></section>';
}
