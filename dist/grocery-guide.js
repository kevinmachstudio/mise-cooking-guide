import { matchesText, normalizeText } from "./ingredient-match.js";

const markets = {
  ranch:["99 Ranch Market","https://www.99ranch.com/stores/search","Chinese greens, fresh noodles, Chinese pantry staples, and hot-pot cuts."],
  hmart:["H Mart","https://www.hmart.com/meat/d","Korean barbecue cuts, refrigerated tofu, and Korean vegetables and pantry staples."],
  costco:["Costco","https://www.costco.com/grocery-household.html","Family packs of meat and seafood, produce, and freezer staples."],
  joes:["Trader Joe’s","https://www.traderjoes.com/home/products/category/meat-seafood-plant-based-122","Smaller packages of proteins and convenient fresh and frozen vegetables."],
  mitsuwa:["Mitsuwa","https://mitsuwa.com/sj/","Japanese ingredients, specialty vegetables, fish, and thinly sliced meat."],
  lion:["Lion Market","https://lionsupermarket.us/locations","Bay Area Asian produce, Vietnamese cooking staples, and fresh seafood."],
  seafood:["Seafood City","https://seafoodcity.com/?redirectAfterStoreSelected=%2Fdepartment%2Fseafood","Filipino cooking staples, whole fish, and fresh seafood."],
  chavez:["Chavez Supermarket","https://www.chavezsuper.com/departments","Mexican produce, hand-cut meats, tortillas, and masa."],
  india:["New India Bazar","https://www.newindiabazar.com/","South Asian vegetables, herbs, pulses, and spices."],
  markethall:["Market Hall Foods","https://www.markethallfoods.com/collections/cheese-charcuterie","Italian specialty cheese, cured meats, and pasta in Oakland."]
};

const categories = ["Vegetables & herbs","Meat & poultry","Fish & seafood","Tofu, noodles & pantry"];
const entries = (category, rows) => rows.map(([name,cuisines,shops,tip,aliases = ""]) => ({
  category,name,cuisines:cuisines.split("|"),shops:shops.split(" "),tip,aliases:aliases.split("|").filter(Boolean)
}));

export const groceryGuide = [
  ...entries(categories[0],[
    ["Baby bok choy","Chinese|Cantonese & Hong Kong|Japanese","ranch hmart","Halve small heads lengthwise and steam or sear cut-side down.","pak choi|shanghai bok choy|bok choy"],
    ["Gai lan","Chinese|Cantonese & Hong Kong","ranch lion","Look for slender stems, then blanch and finish with oyster sauce.","chinese broccoli|kai lan"],
    ["Choy sum","Chinese|Cantonese & Hong Kong|Malaysian","ranch lion","Look for crisp stalks and small flower buds. Blanch or quickly stir-fry.","yu choy|yau choy"],
    ["Napa cabbage","Chinese|Korean|Japanese","hmart ranch","Use the thicker ribs in soups or hot pot and reserve tender leaves for wraps.","chinese cabbage|napa"],
    ["Taiwanese flat cabbage","Taiwanese|Chinese","ranch lion","Tear the thin leaves by hand for rapid stir-frying.","taiwan cabbage|flat cabbage"],
    ["Green or red cabbage","Japanese|Filipino|Mexican","costco joes","Thin shreds make crunchy slaw for tacos or a side for ginger pork.","red or green cabbage|green cabbage|red cabbage|shredded cabbage"],
    ["Water spinach","Vietnamese|Thai|Filipino|Malaysian","lion ranch","Trim tough ends and stir-fry the hollow stems before the leaves.","ong choy|rau muong|kangkong|morning glory"],
    ["Pea shoots","Chinese|Taiwanese","ranch","Choose tender, thin shoots for a quick garlic stir-fry.","snow pea leaves|dou miao"],
    ["Garlic chives","Chinese|Korean|Vietnamese","ranch hmart lion","Use the flat blades in dumplings, savory pancakes, or noodle bowls.","chinese chives|buchu|he"],
    ["Garlic scapes","Chinese|Korean","ranch hmart","Cut the stems into bite-size lengths for a stir-fry with sliced meat.","garlic stems|garlic sprouts"],
    ["Scallions","Chinese|Japanese|Korean|Vietnamese|Mexican","ranch joes","Cook the whites for an aromatic base. Save greens for the finish.","green onions|spring onions"],
    ["Fresh ginger","Chinese|Japanese|Korean|Vietnamese|Indian","ranch hmart joes","Buy firm, unshrivelled knobs for broths, marinades, and ginger pork.","ginger"],
    ["Garlic","Chinese|Korean|Vietnamese|Mexican|Italian|Levantine","costco joes ranch","Firm whole bulbs give you a choice of sliced, minced, or grated garlic."],
    ["Yellow onions","Chinese|Japanese|Indian|Mexican|Italian","costco joes","Use to start braises, soup bases, and stir-fries.","yellow onion"],
    ["Red onions","Vietnamese|Mexican|Indian|Levantine","chavez joes","Slice thinly for quick pickles, salads, or tacos.","red onion"],
    ["Shallots","Thai|Vietnamese|Indonesian|Malaysian","lion ranch","Fry thin slices for a crisp topping or pound raw shallots into curry paste."],
    ["Lemongrass","Vietnamese|Thai|Lao|Malaysian|Indonesian","lion ranch","Buy firm stalks. Bruise the outer stalk for soup or mince the tender core for marinades.","minced lemongrass|lemongrass stalk"],
    ["Galangal","Thai|Lao|Malaysian|Indonesian","lion ranch","Slice fresh or frozen roots for aromatic soup and curry bases."],
    ["Makrut lime leaves","Thai|Lao|Indonesian|Malaysian","lion ranch","Tear whole leaves for simmering or shred very finely for finishing.","kaffir lime leaf|makrut leaves"],
    ["Thai basil","Thai|Vietnamese|Taiwanese","lion ranch","Look for fragrant leaves and purple stems. Add near the end of cooking."],
    ["Holy basil","Thai","lion","Look for bai krapao at a Southeast Asian market for pad kra pao.","holy basil leaves|bai krapao|tulsi"],
    ["Cilantro","Vietnamese|Thai|Mexican|Indian|Lao","chavez lion joes","Save tender stems for sauces and fresh leaves for bowls and tacos.","cilantro or vietnamese coriander|mint or cilantro|cilantro leaves|coriander leaves"],
    ["Mint","Vietnamese|Lao|Levantine|Persian","lion joes","Use tender tips in noodle bowls, herb salads, and yogurt sauces."],
    ["Vietnamese coriander","Vietnamese|Malaysian","lion","Ask for rau răm or laksa leaf for soups and fresh herb plates.","rau ram|laksa leaf"],
    ["Perilla leaves","Korean","hmart","Buy broad, fresh kkaennip leaves for barbecue wraps or quick pickles.","kkaennip|sesame leaves"],
    ["Shiso","Japanese","mitsuwa","Choose crisp leaves for rice bowls, noodles, or a rolled cutlet.","oba|ooba|japanese perilla"],
    ["Mitsuba","Japanese","mitsuwa","Use the tender stems and leaves to finish soups and steamed egg dishes.","japanese parsley"],
    ["Mizuna","Japanese","mitsuwa ranch","Use the slender stems in hot pot, salads, and quick sautés."],
    ["Chrysanthemum greens","Japanese|Chinese|Korean","mitsuwa ranch hmart","Add late to hot pot to keep the leaves tender and fragrant.","shungiku|tong ho|ssukgat|crown daisy"],
    ["Curry leaves","Indian|Malaysian","india","Buy fragrant sprigs for tempering in oil.","kariveppilai|kadi patta"],
    ["Fenugreek leaves","Indian","india","Use fresh or frozen methi in potatoes, dal, or flatbread.","methi|fresh fenugreek"],
    ["Daikon","Japanese|Chinese|Cantonese & Hong Kong|Vietnamese","ranch mitsuwa lion","Buy heavy, firm roots for simmering, pickles, or daikon cake.","white radish|japanese radish"],
    ["Korean radish","Korean","hmart","Look for a squat firm root with a green shoulder for soups or kkakdugi.","mu|moo"],
    ["Kabocha","Japanese|Korean|Filipino","mitsuwa hmart seafood","Choose a hard, heavy squash and cut into wedges for braising or roasting.","kabocha squash|japanese pumpkin"],
    ["Asian eggplant","Chinese|Japanese|Taiwanese|Filipino","ranch mitsuwa seafood","Use slender varieties for tender skins and even cooking.","japanese eggplant|chinese eggplant|japanese or chinese eggplant"],
    ["Thai eggplant","Thai|Lao","lion ranch","Look for small firm round eggplants for coconut curries."],
    ["Pea eggplant","Thai","lion","Use the tiny berries in curry for a pop of bitterness.","turkey berry|makhuea phuang"],
    ["Indian eggplant","Indian","india","Choose small brinjals that can be slit and stuffed for braising.","brinjal|baby eggplant"],
    ["Bitter melon","Chinese|Filipino|Indian|Vietnamese","ranch seafood india","Slice and remove the pith for stir-fries, soup, or bitter melon with eggs.","ampalaya|karela|kho qua"],
    ["Winter melon","Chinese|Vietnamese","ranch lion","Buy a cut wedge for clear soups. Peel before cubing.","wax gourd|dong gua"],
    ["Chayote","Mexican|Filipino|Vietnamese","chavez seafood lion","Choose firm fruits. Peel and slice for soup or a quick sauté.","sayote|su su"],
    ["Bottle gourd","Indian|Chinese|Vietnamese","india ranch lion","Choose smaller tender gourds for dal or soup.","lauki|opo squash|calabash"],
    ["Angled luffa","Chinese|Indian|Vietnamese","ranch india lion","Choose young firm gourds and peel the ridges before cooking.","ridge gourd|sing qua|turai"],
    ["Long beans","Thai|Lao|Filipino|Chinese","lion seafood ranch","Buy flexible pods and cut into short pieces for salads or stir-fries.","yardlong beans|snake beans|sitaw"],
    ["Green beans","Chinese American|Italian|California-style","joes costco","Look for firm beans that snap cleanly. Blister them for a stir-fry.","string beans|haricots verts"],
    ["Broccoli","Chinese American|Japanese|California-style|Meal prep","costco joes","Buy tight florets for bowls, roasting, or beef and broccoli.","broccoli florets"],
    ["Broccolini","Italian|California-style","joes costco","Roast or pan-char the small heads and slender stems together.","baby broccoli"],
    ["Brussels sprouts","California-style|Meal prep","costco joes","Choose tight, even-sized heads to roast cut-side down."],
    ["Broccoli rabe","Italian","joes","Blanch briefly, then sauté with garlic or toss with pasta.","rapini"],
    ["Carrots","Japanese|Vietnamese|Chinese|Meal prep","costco joes","Cut into matchsticks for pickles or dice for fried rice."],
    ["Cucumber","Korean|Japanese|Vietnamese|Persian|Levantine","joes hmart","Thin-skinned Persian or Japanese types suit salads and quick pickles."],
    ["Watercress","Vietnamese|Chinese|California-style","lion ranch","Look for crisp bunches for shaking beef or soup."],
    ["Leaf lettuce","Korean|Vietnamese|Mexican","joes costco","Choose sturdy butter lettuce or leaf lettuce for wraps.","lettuce leaves|butter lettuce leaves|green leaf lettuce"],
    ["Baby spinach","Japanese|Korean|Indian|Meal prep","costco joes","Blanch for sesame sides or wilt into a skillet or saag.","spinach"],
    ["Kale","Italian|California-style|Meal prep","joes costco","Strip thick stems to braise with lentils or shred for salads.","chopped kale"],
    ["Bean sprouts","Vietnamese|Korean|Chinese|Thai","lion hmart ranch","Check the pack for mung bean versus bigger soybean sprouts before buying.","mung bean sprouts|soybean sprouts|kongnamul"],
    ["Shelled edamame","Japanese|Chinese|Meal prep","joes hmart mitsuwa","Choose shelled for bowls and pods for snacks.","edamame|mukimame"],
    ["Snow peas","Chinese|Cantonese & Hong Kong","ranch joes","Pull the strings off the pods and stir-fry briefly.","mangetout"],
    ["Sugar snap peas","Chinese American|California-style","costco joes","Use the thicker sweet pods in quick stir-fries or salads.","snap peas"],
    ["Frozen peas","Chinese American|Japanese|Indian|Meal prep","costco joes","Keep a bag for fried rice, soboro bowls, or matar paneer.","green peas"],
    ["Bell peppers","Chinese|Mexican|Italian|Meal prep","costco chavez joes","Look for firm peppers. Green is useful in di san xian and ripe red peppers roast well.","green bell pepper|red bell pepper"],
    ["Thai bird’s-eye chiles","Thai|Vietnamese|Lao|Filipino","lion ranch","Buy a small amount because a few chiles season a whole dish.","thai chile|bird eye chile|prik kee noo"],
    ["Shishito peppers","Japanese|California-style","mitsuwa joes","Blister whole pods in a hot pan and season just before serving.","shishito"],
    ["Fresh jalapeños","Mexican|Vietnamese","chavez joes","Slice for tacos, noodle soup, or pickles.","jalapeno|jalapenos"],
    ["Serrano chiles","Mexican","chavez","Choose firm slim peppers for fresh salsa.","serrano peppers"],
    ["Poblano peppers","Mexican","chavez","Roast large firm peppers for rajas or chiles rellenos.","poblano chile"],
    ["Tomatillos","Mexican","chavez","Pick firm fruits in intact husks. Remove the husks and rinse before roasting.","tomatillo"],
    ["Roma tomatoes","Mexican|Italian|Levantine","chavez joes","Fleshy plum tomatoes roast well for sauce or salsa.","tomatoes|plum tomato"],
    ["Nopales","Mexican","chavez","Buy de-spined paddles or pre-cut strips for salads and tacos.","cactus paddles|nopal"],
    ["Jicama","Mexican|Vietnamese|Filipino","chavez lion seafood","Look for a firm root to peel and cut into sticks or slaw.","singkamas"],
    ["Avocados","Mexican|California-style","chavez costco joes","Buy firm fruit for later in the week or slightly yielding fruit for tonight.","avocado"],
    ["Limes","Mexican|Vietnamese|Thai|Lao","chavez lion costco","Buy heavy fruit for its size for juice and finishing.","lime"],
    ["Lemons","California-style|Italian|Levantine|Persian","joes costco","Use the zest ahead of juicing for extra flavor without extra liquid.","lemon"],
    ["Fresh shiitake","Chinese|Japanese|Korean","ranch hmart mitsuwa","Choose firm caps. Save trimmed stems for broth.","fresh shiitake mushrooms|shiitake"],
    ["Enoki","Japanese|Korean|Chinese","mitsuwa hmart ranch","Look for firm stems and cook thoroughly in simmering broths.","enoki mushrooms"],
    ["King oyster mushrooms","Korean|Chinese|Japanese","hmart ranch mitsuwa","Thick stems slice neatly for grilling or pan-searing.","king trumpet mushrooms|saesongi"],
    ["Shimeji","Japanese|Chinese","mitsuwa ranch","Trim the joined base and pull the clusters apart before cooking.","beech mushrooms|bunashimeji"],
    ["Cremini mushrooms","Italian|California-style|Meal prep","joes costco","Use firm brown caps for roasting or a chopped ragù.","baby bella mushrooms|cremini"],
    ["Lotus root","Chinese|Japanese|Taiwanese","ranch mitsuwa","Choose firm segments and slice across to show the holes.","renkon|lian ou"],
    ["Burdock root","Japanese|Korean","mitsuwa hmart","Look for long slim roots for kinpira or simmered sides.","gobo|ueong"],
    ["Bamboo shoots","Chinese|Japanese|Vietnamese|Thai","ranch mitsuwa lion","Choose ready-to-use canned or packaged shoots for stir-fries and dumplings.","canned bamboo shoots|bamboo shoot"],
    ["Taro","Chinese|Filipino|Vietnamese|Taiwanese","ranch seafood lion","Select firm roots and cook fully in braises or soups.","gabi|khoai mon"],
    ["Japanese sweet potatoes","Japanese|Korean","mitsuwa hmart","Look for firm purple-skinned tubers to roast or simmer.","satsumaimo|goguma"],
    ["Yukon Gold potatoes","Chinese|Indian|Meal prep","joes costco","Use yellow potatoes in di san xian or a breakfast skillet.","potatoes|yukon gold"],
    ["Okra","Indian|Filipino|Levantine","india seafood","Buy small tender pods for quicker cooking.","bhindi|lady fingers"],
    ["Drumstick pods","Indian","india","Look for green moringa pods for sambar. The inner flesh is the part to eat.","moringa pods|murungakkai"],
    ["Banana blossom","Filipino|Vietnamese|Thai","seafood lion","Look for fresh or canned blossom for salads and stews.","banana flower|puso ng saging"],
    ["Banana leaves","Filipino|Thai|Mexican|Indonesian","seafood lion chavez","Look in the freezer for pliable wrapping leaves to steam or grill."],
    ["Green papaya","Thai|Lao|Vietnamese|Filipino","lion seafood","Buy an unripe, firm fruit for shredding or simmering."],
    ["Asian pears","Korean|Chinese|Taiwanese","hmart ranch","Look for a firm juicy pear to grate into bulgogi or galbi marinade.","asian pear|korean pear|nashi"],
    ["Leeks","Japanese–Californian|Italian","joes ranch","Rinse sand from between layers. The pale bases char and braise well."],
    ["Maitake mushrooms","Japanese|Cantonese–Californian","mitsuwa ranch","Look for feathery clusters that can be torn and browned.","hen of the woods|maitake"],
    ["Chanterelle mushrooms","Italian|Japanese–Italian fusion","joes","Check the seasonal mushroom case. Oyster mushrooms are a good alternative.","chanterelles"],
    ["Fresh basil","Italian","joes costco","Use sweet basil for pasta alla Norma or tear it over tomato dishes.","sweet basil"],
    ["Flat-leaf parsley","Italian|Italian American|Levantine","joes chavez","Choose crisp leaves for piccata, bean soup, and herb sauces.","italian parsley|parsley"],
    ["Fresh thyme","Italian|California-style","joes","Strip the small leaves from the woody stems for mushroom ragù.","fresh thyme leaves"],
    ["Tuscan kale","Italian","joes costco","Look for dark, bumpy leaves for ribollita and bean soups.","cavolo nero|lacinato kale|dinosaur kale"]
  ]),
  ...entries(categories[1],[
    ["Chicken breast, boneless and skinless","Vietnamese|Chinese American|Mexican|Meal prep","costco joes","Ask for cutlets or halve thick breasts for fast, even searing.","raw boneless skinless chicken breast|chicken breast|chicken breasts"],
    ["Chicken thighs, boneless and skinless","Japanese|Korean|Chinese American|Filipino","costco joes ranch","Boneless thighs suit skillet teriyaki, gochujang glaze, and adobo.","boneless skinless chicken thighs|chicken thighs"],
    ["Bone-in chicken thighs","Filipino|Indian|Italian","costco joes ranch","Buy similar sizes for braises and sheet-pan meals.","skin on chicken thighs"],
    ["Chicken drumsticks","Filipino|Indian|Vietnamese","ranch costco","Bone-in drumsticks work well in marinades and braises."],
    ["Chicken wings","Korean|Vietnamese|Chinese","hmart costco ranch","Buy split flats and drumettes for quick, even glazing."],
    ["Whole chicken","Chinese|Cantonese & Hong Kong|Vietnamese|Filipino","ranch lion costco","A whole bird works for a poached centerpiece and stock."],
    ["Ground chicken","Thai|Japanese|Meal prep","joes ranch","Lean ground chicken works for basil chicken or soboro.","lean ground chicken"],
    ["Ground turkey","Mexican|Meal prep","costco joes","Compare lean percentages when buying for bowls and skillet meals.","lean ground turkey|raw 93 lean ground turkey"],
    ["Turkey breast","Meal prep|California-style","costco joes","Buy plain cooked or uncooked to suit the recipe and label it before freezing.","cooked turkey breast"],
    ["Beef brisket","Korean|Vietnamese|Chinese","hmart lion costco","Use a flat piece for neat soup slices, or ask for thin slices for hot pot."],
    ["Beef short ribs, flanken-cut","Korean","hmart ranch","Ask for thin LA-style ribs cut across the bone for grilling.","la galbi|kalbi|cross cut short ribs"],
    ["Beef short ribs, English-cut","Korean|Vietnamese|Chinese","hmart costco ranch","Ask for thick single-bone pieces for galbijjim or phở.","bone in beef short ribs|english cut short ribs|beef short ribs"],
    ["Boneless beef short ribs","Korean|Chinese","hmart costco","Ask how thick the ribs are and choose evenly cut pieces for grilling."],
    ["Beef ribeye rolls","Korean|Japanese|Chinese","hmart mitsuwa ranch","Choose thin, unseasoned slices for shabu-shabu, sukiyaki, and hot pot.","sliced ribeye|thin ribeye|hot pot beef"],
    ["Flank steak","Chinese American|Mexican|Vietnamese","costco chavez","Slice against the grain for stir-fries or steak tacos."],
    ["Skirt steak","Mexican|California-style","chavez joes","Ask for outside skirt or flap meat for a similar fast grill cut.","arrachera"],
    ["Beef flap meat","Mexican","chavez costco","Ask for thin carne asada-style slices or buy unseasoned to marinate yourself.","sirloin flap|bavette"],
    ["Top sirloin","Vietnamese|Korean|California-style","costco chavez joes","Use cubes for shaking beef or thin slices for the grill.","top sirloin or filet mignon|top sirloin steak|sirloin"],
    ["Beef tenderloin","Vietnamese|California-style","costco joes","Tender cubes are useful for quick-seared shaking beef.","filet mignon"],
    ["Beef chuck roast","Chinese|Mexican|Filipino","costco chavez ranch","A marbled shoulder cut that softens during slow braising.","chuck roast|chuck"],
    ["Beef shank","Chinese|Taiwanese|Vietnamese|Mexican","ranch lion chavez","Look for cross-cut shanks for stews or whole shank for slicing.","shank|osso buco"],
    ["Oxtail","Korean|Filipino|Chinese|Vietnamese","hmart ranch seafood","Smaller pieces suit soup and stew pots. Ask for cross-cut joints.","beef oxtail|ox tail"],
    ["Beef marrow bones","Korean|Vietnamese","hmart ranch lion","Ask for cross-cut leg bones for soups such as seolleongtang.","beef leg or marrow bones|soup bones|knuckle bones"],
    ["Ground beef","Mexican|Korean|Italian|Meal prep","costco joes chavez","Check the lean percentage for the texture and fat you want."],
    ["Beef tripe","Vietnamese|Mexican|Chinese","lion chavez ranch","Ask for cleaned honeycomb tripe for phở, menudo, or braising.","honeycomb tripe"],
    ["Beef tongue","Mexican|Japanese","chavez mitsuwa","Ask for whole tongue for braising or thin-sliced gyūtan at a Japanese market.","lengua|gyutan"],
    ["Pork belly","Korean|Chinese|Filipino|Japanese","hmart ranch seafood","Choose a slab to braise or thick slices for Korean barbecue.","sliced pork belly|samgyeopsal"],
    ["Pork shoulder","Mexican|Chinese|Filipino|Japanese","chavez costco ranch","Look for boneless shoulder for carnitas, char siu, or thin-cut ginger pork.","pork butt|boston butt|boneless pork shoulder"],
    ["Pork loin","Japanese|Cantonese & Hong Kong|Chinese","costco joes ranch","Choose center-cut loin for lean stir-fries, char siu, or tonkatsu.","pork chops|boneless pork chops|boneless center cut pork chops"],
    ["Pork tenderloin","Vietnamese|Mexican|California-style","costco joes","Use medallions or thin slices for quick cooking."],
    ["Ground pork","Chinese|Taiwanese|Korean|Japanese","ranch hmart","Ask for a fattier grind for dumplings or lean for rice bowls.","lean ground pork"],
    ["Pork spareribs","Cantonese & Hong Kong|Chinese|Filipino","ranch seafood","Ask for bite-size cross-cut pieces at the butcher counter for dim sum.","spare ribs|pork spare ribs"],
    ["Pork neck bones","Korean|Filipino|Chinese","hmart seafood ranch","Use cut bones for gamjatang and other simmered soups."],
    ["Pork hocks","Filipino|Chinese","seafood ranch","Buy fresh hocks for braising or a cooked preparation like crispy pata.","pork knuckle|pata"],
    ["Char siu","Cantonese & Hong Kong|Chinese","ranch lion","Ask at the barbecue counter for cooked char siu, whole or chopped.","cooked char siu pork|cooked char siu|chinese bbq pork"],
    ["Lap cheong","Cantonese & Hong Kong|Chinese|Taiwanese","ranch lion","Look for Chinese sausage for claypot rice or daikon cake.","lap cheong chinese sausage|lap xuong|chinese sausage"],
    ["Mexican chorizo","Mexican","chavez","Choose fresh, uncooked chorizo for eggs, potatoes, or tacos."],
    ["Filipino longganisa","Filipino","seafood","Look for garlic or sweet styles in the refrigerated or frozen case.","longanisa|longganisa"],
    ["Duck, whole","Cantonese & Hong Kong|Chinese|Vietnamese","ranch hmart lion","Look for whole birds in the freezer and choose one to fit your roasting pan.","whole duck"],
    ["Duck breast","Chinese|California-style","ranch hmart","Choose even breasts when you want to render the skin and sear."],
    ["Lamb leg","Chinese|Levantine|Persian|Indian","costco","Ask for boneless leg to cube or thinly slice for cumin lamb.","boneless lamb leg|leg of lamb"],
    ["Ground lamb","Chinese|Levantine|Persian|Indian","costco","Look for a lean grind for ragù, kebabs, and skillet dishes.","lean ground lamb"],
    ["Lamb shoulder","Indian|Levantine|Persian","costco","Choose shoulder for long-simmered curries and braises."],
    ["Goat stew meat","Mexican|Indian|Filipino","chavez","Ask for bone-in pieces for birria, curried goat, or kaldereta.","cabrito|goat"],
    ["Eggs","Chinese|Japanese|Korean|Vietnamese|Mexican|Meal prep","costco joes","Check size before measuring for dumplings, custards, or a breakfast skillet.","large eggs|large eggs without shells"],
    ["Liquid egg whites","Meal prep","costco joes","Use the carton weight to portion skillet dishes or scrambles."],
    ["Italian sausage","Italian|Italian American","joes costco","Choose mild fennel sausage for polenta or hot sausage for additional chile.","raw italian pork sausage|raw italian turkey sausage"],
    ["Pancetta","Italian|Japanese–Italian fusion","markethall joes","Ask for a thick slice when you need cubes for ragù or tomato sauce."],
    ["Guanciale","Italian|Japanese–Italian fusion","markethall","Ask a specialty deli counter for cured pork jowl. Pancetta works in the yuba recipe."],
    ["Ground duck","Japanese–Californian","ranch hmart","Ask at the butcher counter or grind boneless duck yourself for dumplings."]
  ]),
  ...entries(categories[2],[
    ["Salmon fillets","Japanese|California-style|Meal prep","costco joes mitsuwa","Choose even fillets and skin-on pieces if you want a crisp sear.","raw salmon fillet|salmon|salmon fillet"],
    ["Cod fillets","Cantonese & Hong Kong|Korean|Mexican|California-style","costco joes ranch","Thicker fillets suit steaming and hot pot. Smaller pieces work for tacos.","skinless cod|skinless cod fillets|skinless cod or sea bass fillets|cod"],
    ["Sea bass","Cantonese & Hong Kong|Chinese|California-style","ranch costco","Ask which species is being sold and whether you want fillets or a whole fish.","black sea bass|skinless sea bass fillets"],
    ["Black cod","Japanese|California-style|Japanese–Californian","mitsuwa ranch","Buy thick pieces for steaming or miso broiling. This rich fish is also sold as sablefish.","black cod fillets|sablefish|gindara"],
    ["Mackerel","Japanese|Korean|Filipino","mitsuwa hmart seafood","Choose whole fish or fillets for grilling. Check whether packages are salted.","saba|saengseon godeungeo"],
    ["Yellowtail","Japanese|California-style","mitsuwa ranch","Ask for fillets or collars. The fatty collar works well under a broiler.","hamachi|buri"],
    ["Yellow croaker","Korean|Chinese","hmart ranch","Choose similar-sized fish so they cook evenly when pan-fried.","jogi|yellow corvina"],
    ["Branzino","Italian|Chinese|Levantine","costco ranch","Ask the counter to scale and gut a whole fish for roasting.","european sea bass"],
    ["Milkfish","Filipino","seafood","Buy deboned fillets if you want to avoid its many fine bones.","bangus"],
    ["Tilapia","Filipino|Mexican|Vietnamese","seafood chavez lion","Ask for cleaned whole fish for frying or fillets for tacos."],
    ["Catfish","Vietnamese|Thai|Filipino","lion seafood","Steaks suit caramel-braised cá kho. Fillets are easier to portion.","catfish steaks|ca tre"],
    ["Red snapper","Cantonese & Hong Kong|Mexican|Filipino","ranch seafood chavez","Look for a cleaned whole fish for steaming or roasting.","huachinango"],
    ["Rainbow trout","Japanese|California-style","costco ranch","Buy evenly sized fillets for pan-searing or whole cleaned fish for roasting."],
    ["Halibut","California-style|Mexican","costco joes","Choose thick, even portions to roast, grill, or use in fish tacos."],
    ["Mahi-mahi","California-style|Mexican","costco joes","Thick firm fillets work well for grilling or blackened fish tacos.","dorado"],
    ["Rockfish","California-style|Cantonese & Hong Kong","ranch costco","Use smaller fillets for quick steaming, searing, or tacos."],
    ["Sardines","Filipino|Italian|Levantine","seafood ranch","Ask for fresh whole fish or choose canned for salads and pasta."],
    ["Shrimp, peeled and deveined","Chinese|Vietnamese|Thai|Japanese|Mexican|Meal prep","costco ranch joes","Choose a size by count per pound. Small shrimp suit fried rice and bánh khọt.","raw shrimp|shrimp|small raw shrimp"],
    ["Head-on prawns","Vietnamese|Chinese|Filipino|Thai","ranch lion seafood","Use head-on prawns for grilling or to enrich a broth.","whole shrimp|head-on shrimp"],
    ["Dungeness crab","Cantonese & Hong Kong|California-style|Vietnamese","ranch lion seafood","Ask for cleaned pieces to cook or cooked picked meat for noodles.","cooked dungeness or blue crab meat|dungeness crab meat"],
    ["Blue crab","Vietnamese|Filipino|Cantonese & Hong Kong","lion seafood ranch","Ask for cleaned pieces for soups and braises."],
    ["Lobster meat","Cantonese & Hong Kong|California-style","costco ranch","Thaw frozen raw meat in the refrigerator before finely chopping for dumplings.","raw lobster meat|lobster tail"],
    ["Sea scallops","Japanese|Cantonese & Hong Kong|California-style","costco ranch","Ask for dry-packed scallops for better browning.","raw sea scallops"],
    ["Manila clams","Chinese|Japanese|Korean|Vietnamese","ranch hmart lion","Use small clams for soups, sake steaming, or black-bean stir-fry.","little neck clams|asari"],
    ["Mussels","Thai|Filipino|Italian","seafood ranch costco","Choose live mussels or check for plain frozen mussels to simmer in broth."],
    ["Squid","Korean|Filipino|Vietnamese|Thai","hmart seafood lion","Cleaned tubes and tentacles save prep time for quick stir-fries.","calamari"],
    ["Octopus","Korean|Japanese|Mexican","hmart mitsuwa chavez","Check whether it is cooked or raw before planning prep time.","pulpo|tako"],
    ["Fish balls","Chinese|Cantonese & Hong Kong|Thai|Filipino","ranch lion seafood","Find plain fish balls in the freezer for soups and hot pot."],
    ["Korean fish cakes","Korean","hmart","Look for flat eomuk sheets for tteokbokki and fish cake soup.","eomuk|odeng"],
    ["Dried shrimp","Cantonese & Hong Kong|Thai|Malaysian|Filipino","ranch lion seafood","Buy small bags for daikon cake, curry pastes, and soup seasoning."]
  ]),
  ...entries(categories[3],[
    ["Extra-firm tofu","Korean|Chinese|Japanese|Meal prep","hmart ranch joes","Look for water-packed blocks for searing, braising, and bowls."],
    ["Soft tofu","Chinese|Korean|Japanese","hmart ranch mitsuwa","Choose a soft block for mapo tofu or a tube for sundubu.","soft tofu silken tofu|silken tofu"],
    ["Fried tofu puffs","Chinese|Malaysian|Vietnamese","ranch lion","Use in laksa or braises where the puffs can soak up broth.","tofu puffs|tau pok"],
    ["Dried bean curd sticks","Chinese|Taiwanese","ranch","Look for yuba sticks to rehydrate for braises and hot pot.","tofu skin|fuzhu"],
    ["Paneer","Indian","india","Use a firm block for cubes in spinach or pea curries."],
    ["Tempeh","Indonesian|Malaysian|Meal prep","ranch joes","Look for a plain soybean block for slicing, browning, or braising."],
    ["Jasmine rice","Thai|Vietnamese|Chinese|Cantonese & Hong Kong","ranch lion costco","Choose dry jasmine rice for braises, claypot rice, and rice plates."],
    ["Cooked rice","Japanese|Chinese|Korean|Mexican|Meal prep","costco joes ranch","Use cooked weight when the recipe specifies it, or look for plain frozen rice.","chilled cooked rice|steamed rice"],
    ["Japanese short-grain rice","Japanese|Korean","mitsuwa hmart costco","Choose plain short-grain rice for donburi and onigiri.","sushi rice|koshihikari"],
    ["Rice vermicelli","Vietnamese|Thai|Lao|Malaysian","lion ranch","Match the shape to the recipe. Thick round noodles suit bún bò Huế.","dry rice vermicelli|dry thick round rice vermicelli|bun noodles"],
    ["Flat phở noodles","Vietnamese","lion ranch","Buy fresh or dried flat rice noodles sized to your preference.","dry flat pho noodles|banh pho"],
    ["Fresh wide rice noodles","Chinese|Cantonese & Hong Kong|Thai","ranch lion","Check the refrigerated case for flat sheets or cut noodles.","ho fun|sen yai"],
    ["Fresh wheat noodles","Chinese|Taiwanese","ranch","Choose medium-width noodles for scallion oil noodles and zhajiangmian."],
    ["Chow mein noodles","Chinese American|Cantonese & Hong Kong","ranch","Look for fresh, thin wheat noodles and check whether they are pre-steamed.","fresh chow mein noodles"],
    ["Somyeon","Korean|Japanese","hmart mitsuwa","Buy thin wheat noodles for soup. Sōmen is a comparable Japanese option.","dry somyeon noodles|somen"],
    ["Korean rice cakes","Korean","hmart","Look for cylindrical tteok in the cooler or freezer.","cylindrical korean rice cakes|tteok|tteokbokki"],
    ["Round wonton wrappers","Cantonese & Hong Kong|Chinese","ranch hmart","Choose thin round wrappers for siu mai.","round thin wonton wrappers|wonton wrappers"],
    ["Corn tortillas","Mexican","chavez joes","Look for supple tortillas or masa if you want to press your own.","small corn tortillas|tortillas"],
    ["Black beans","Mexican|Meal prep","chavez costco joes","Use dry beans for batch cooking or drained canned beans in bowls.","cooked or canned black beans"],
    ["Cooked lentils","Indian|Levantine|Persian|Meal prep","india joes","Choose lentils that hold their shape for bowls or split lentils for dal.","lentils"],
    ["Soy sauce","Chinese|Japanese|Korean|Filipino","ranch hmart mitsuwa","Check for regular, light, dark, or soup soy sauce as specified.","light soy sauce|dark soy sauce|korean soup soy sauce"],
    ["Oyster sauce","Chinese|Cantonese & Hong Kong|Thai","ranch lion","Choose oyster sauce for glossy stir-fries or mushroom sauce for a vegetarian swap."],
    ["Doubanjiang","Chinese","ranch","Look for Pixian chile bean paste for mapo tofu.","pixian doubanjiang|chili bean paste"],
    ["Fermented black beans","Chinese|Cantonese & Hong Kong","ranch lion","Look for whole salted black soybeans for steaming or braising.","fermented black beans douchi|douchi"],
    ["Gochujang","Korean","hmart","Choose a heat level for marinades, glosses, and stew bases."],
    ["Gochugaru","Korean","hmart","Buy coarse flakes for kimchi or finer powder for sauces and stews."],
    ["White miso","Japanese","mitsuwa hmart","Look for shiro miso in the chilled case for glazes and dressings.","shiro miso"],
    ["Mirin","Japanese","mitsuwa ranch","Check the label for hon mirin or the sweetened seasoning style."],
    ["Shaoxing wine","Chinese|Cantonese & Hong Kong|Taiwanese","ranch","Check whether a cooking wine is salted before seasoning the dish.","unsalted shaoxing wine"],
    ["Fish sauce","Vietnamese|Thai|Lao|Filipino","lion ranch seafood","Check the ingredients for the fish and salt base. Adjust brand to taste."],
    ["Rice vinegar","Chinese|Japanese|Korean|Vietnamese","ranch mitsuwa hmart","Buy unseasoned when a recipe gives its own salt and sugar amounts."],
    ["Toasted sesame oil","Chinese|Korean|Japanese","ranch hmart mitsuwa","Look for toasted oil for finishing or marinades."],
    ["Cornstarch","Chinese|Cantonese & Hong Kong|Chinese American","ranch costco","Use to velvet meat, thicken a sauce, or crisp a coating."],
    ["Greek yogurt","Meal prep|Levantine|Persian","costco joes","Plain yogurt works in savory sauces and breakfast bowls.","plain nonfat greek yogurt"],
    ["Polenta cornmeal","Italian","joes costco","Choose medium-grind yellow cornmeal for creamy stove-cooked polenta.","medium-grind polenta cornmeal|cornmeal"],
    ["Cooked tube polenta","Italian","joes","Look for plain ready-to-slice polenta for quick crisp rounds.","ready-made polenta"],
    ["Cannellini beans","Italian|Japanese–Italian fusion","joes costco","Use drained canned beans for ribollita, mushroom ragù, or pasta.","cooked cannellini beans|white kidney beans"],
    ["Cranberry beans","Italian|Cantonese–Californian","joes","Ask for borlotti where specialty beans are stocked. Pinto beans are an easier swap.","cooked cranberry beans|borlotti"],
    ["Dry tagliatelle","Italian","joes","Wide egg pasta ribbons hold thick meat ragù. Pappardelle is another option.","fresh tagliatelle|tagliatelle"],
    ["Dry rigatoni","Italian","joes costco","Look for ridged tubes that catch tomato sauce.","dry whole-wheat rigatoni|rigatoni"],
    ["Parmesan","Italian|Italian American","joes costco","Buy a wedge to shave or grate over pasta and polenta.","grated parmesan|parmigiano reggiano"],
    ["Ricotta salata","Italian","markethall","Ask the specialty cheese counter for the firm salted ricotta used in pasta alla Norma."],
    ["Pecorino Romano","Italian|Japanese–Italian fusion","joes costco","Use a salty sheep’s milk cheese to finish tomato sauces.","grated pecorino romano"],
    ["Capers","Italian American|Italian","joes","Look for small brined capers for piccata or tomato sauces."],
    ["Tomato passata","Italian","joes","Choose a plain smooth strained tomato purée for ragù.","strained tomatoes"],
    ["Dried yuba sheets","Japanese|Chinese|Japanese–Italian fusion","mitsuwa ranch","Ask for flat tofu-skin sheets if you want to cut broad ribbons."],
    ["Gyoza wrappers","Japanese|Japanese–Californian","mitsuwa ranch","Choose thin round wrappers from the refrigerated or frozen case."],
    ["Yuzu juice","Japanese|Japanese–Californian","mitsuwa","Check for unsweetened bottled yuzu juice in the dressing or citrus aisle."],
    ["Unsalted dashi","Japanese|Japanese–Californian","mitsuwa ranch","Compare sodium if buying prepared dashi, or buy kombu to make a plain broth."],
    ["Ají amarillo paste","Japanese–Peruvian","chavez","Try a Latin market’s Peruvian foods shelf and check the label for added salt or oil.","aji amarillo|peruvian yellow chile paste"]
  ])
];

const ingredientIndex = new Map();
for (const item of groceryGuide) {
  for (const name of [item.name,...item.aliases]) ingredientIndex.set(normalizeText(name),item);
}

export function cuisineForGroceries(cuisine) {
  if (cuisine.includes("–")) return cuisine;
  if (/cantonese|hong kong/i.test(cuisine)) return "Cantonese & Hong Kong";
  if (/chinese american/i.test(cuisine)) return "Chinese American";
  if (/chinese|shanghainese|sichuanese|xinjiang/i.test(cuisine)) return "Chinese";
  if (/taco/i.test(cuisine)) return "Mexican";
  if (/california/i.test(cuisine)) return "California-style";
  return cuisine.replace(/-inspired$/,"");
}

const specialtyMarkets = {
  "Cantonese & Hong Kong":["ranch","lion"], Chinese:["ranch","hmart"], "Chinese American":["ranch","costco"],
  Japanese:["mitsuwa","ranch"], Korean:["hmart","ranch"], Vietnamese:["lion","ranch"], Thai:["lion","ranch"], Mexican:["chavez","joes"]
};

export function groceryStores(item) {
  const known = ingredientIndex.get(item.key);
  const specialty = item.cuisines.length === 1 && specialtyMarkets[item.cuisines[0]];
  const shops = known?.shops ?? (specialty || ["costco","joes"]);
  return shops.map(shop=>markets[shop][0]);
}

export function groceryGuidePage(icon) {
  const options = list => list.map(([value,label])=>'<option value="' + value.replaceAll("&","&amp;") + '">' + label + '</option>').join("");
  const cuisines = [...new Set(groceryGuide.flatMap(item=>item.cuisines))].sort();
  return `<section id="grocery-guide" class="wrap page-body">
    <div class="guide-navigation pills"><a href="#pantry">Pantry staples</a><a href="#pantry/groceries" aria-current="page">Grocery guide</a></div>
    <div class="grocery-filters">
      <label class="field-search">${icon("search",19)}<input type="search" id="grocery-guide-search" placeholder="Try gai lan, flank steak, or H Mart" aria-label="Search grocery ingredients" autocomplete="off"></label>
      <label>Cuisine <select id="grocery-guide-cuisine"><option value="">All cuisines</option>${options(cuisines.map(name=>[name,name]))}</select></label>
      <label>Ingredient type <select id="grocery-guide-category"><option value="">All ingredients</option>${options(categories.map(name=>[name,name]))}</select></label>
      <label>Store <select id="grocery-guide-store"><option value="">All stores</option>${options(Object.entries(markets).map(([id,[name]])=>[id,name]))}</select></label>
    </div>
    <p class="reference grocery-market-note">Store suggestions reflect the kinds of ingredients each retailer carries. Stock varies by branch and season.</p>
    <details class="grocery-market-directory">
      <summary>Where to shop</summary>
      <dl>${Object.values(markets).map(([shop,url,tip])=>'<div><dt><a href="' + url + '" target="_blank" rel="noopener">' + shop + '</a></dt><dd>' + tip + '</dd></div>').join("")}</dl>
    </details>
    <p id="grocery-guide-count" class="reference" role="status"></p>
    <div id="grocery-guide-results"></div>
  </section>`;
}

export function mountGroceryGuide(root, query) {
  const search = root.querySelector("#grocery-guide-search");
  const cuisine = root.querySelector("#grocery-guide-cuisine");
  const category = root.querySelector("#grocery-guide-category");
  const store = root.querySelector("#grocery-guide-store");
  search.value = query;
  function render() {
    const matches = groceryGuide.filter(item => (!cuisine.value || item.cuisines.includes(cuisine.value)) &&
      (!category.value || item.category === category.value) && (!store.value || item.shops.includes(store.value)) &&
      matchesText(search.value,[item.name,...item.aliases,...item.cuisines,...item.shops,...item.shops.map(shop=>markets[shop][0])].join(" ")));
    root.querySelector("#grocery-guide-count").textContent = matches.length + (matches.length === 1 ? " ingredient" : " ingredients");
    root.querySelector("#grocery-guide-results").innerHTML = matches.length ? categories.map(name => {
      const items = matches.filter(item=>item.category === name).sort((a,b)=>a.name.localeCompare(b.name));
      if (!items.length) return "";
      return '<section class="grocery-guide-category"><h2>' + name + '</h2><div class="grocery-guide-grid">' + items.map(item =>
        '<article class="grocery-guide-card"><h3>' + item.name + '</h3><p class="grocery-guide-cuisines">' + item.cuisines.join(" · ") +
        '</p><p>' + item.tip + '</p><div class="grocery-guide-stores" aria-label="Stores to check">' + item.shops.map(shop => {
          const [name,url] = markets[shop];
          return '<a href="' + url + '" target="_blank" rel="noopener">' + name + '</a>';
        }).join("") + '</div></article>'
      ).join("") + '</div></section>';
    }).join("") : '<p class="matcher-empty">No ingredients match. Try a different name, cuisine, or store.</p>';
  }
  search.addEventListener("input",render);
  root.addEventListener("change",render);
  render();
}
