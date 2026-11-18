const beefRef = ["Beef cut finder", "https://www.beefitswhatsfordinner.com/cuts"];
const porkRef = ["National Pork Board cut guide", "https://www.pork.org/cuts/"];
const lambRef = ["American Lamb Board cut guide", "https://americanlamb.com/cuts-of-lamb/"];
const carnitas = ["Slow Cooker Carnitas","https://www.recipetineats.com/pork-carnitas-mexican-slow-cooker-pulled-pork/"];
const internal = id => [null, "#recipe/" + id];
const whole = "145°F / 63°C + 3-minute rest";
const poultry = "165°F / 74°C";
const ground = "160°F / 71°C";

export const meats = [
  {id:"beef", name:"Beef", color:"#9a4635", summary:"Marbling is useful for steaks. For a simmer or braise, look for connective tissue and give it time.", reference:beefRef,
   outline:"M98 78 Q112 69 142 71 Q267 65 390 71 Q437 75 445 106 L449 139 L442 179 L449 212 L429 212 L411 164 L380 157 L373 175 L365 210 L345 210 L348 169 Q282 185 203 160 L188 164 L181 208 L160 208 L158 164 L142 155 L145 212 L125 212 L124 146 L110 121 L84 127 L60 119 L51 107 L57 93 L72 83 L73 66 L91 76 Z",
   accents:["M441 94 Q466 99 471 126 L468 151","M70 98 l5 0","M57 111 q12 5 23 1","M90 84 q13-14 4-24"],
   zones:[
    ["chuck","M127 74 L203 71 L200 130 L180 156 L148 153 L123 128 L115 95 Z",164,105],
    ["rib","M207 71 L272 70 L270 130 L205 131 Z",239,101],
    ["loin","M276 70 L365 70 L356 122 L275 130 Z",319,97],
    ["round","M370 71 Q434 72 443 108 L446 141 L430 171 L384 155 L360 125 Z",402,108],
    ["brisket","M123 132 L148 154 L181 159 L198 138 L205 163 L185 169 L161 165 L143 156 Z",166,151],
    ["plate","M207 136 L270 135 L270 173 Q231 169 207 162 Z",239,151],
    ["flank","M276 135 L356 127 L376 155 L347 170 Q309 175 276 173 Z",315,151],
    ["shank","M160 169 L183 172 L179 205 L163 205 Z",171,187]],
   cuts:[
    ["chuck","Chuck roast","Braise", "Choose a roast with fine seams of fat and an even thickness.","Salt, brown well, and simmer covered with liquid until fork-tender. About 3–4 hours for a large roast.",whole,["Slow Cooker Beef Pot Roast","https://www.recipetineats.com/slow-cooker-beef-pot-roast/"]],
    ["rib","Ribeye","Sear or grill","Look for even thickness and flecks of intramuscular fat.","Pat dry, salt, and sear. On a thick steak, finish over gentler heat.",whole,["Reverse-Seared Steak","https://www.seriouseats.com/reverse-seared-steak-recipe"]],
    ["loin","Strip steak","Sear or grill","Look for an even steak with a narrow fat cap.","Pat dry and sear over high heat. Hold the fat edge to the pan to render it.",whole,["Reverse-Seared Steak","https://www.seriouseats.com/reverse-seared-steak-recipe"]],
    ["loin","Tenderloin","Roast or sear","Buy a center-cut piece for even cooking. It is lean and tender.","Remove silverskin, tie a roast evenly, and finish with a thermometer.",whole,beefRef],
    ["round","Top round","Roast","Choose an even cut with little surface fat.","Roast gently and slice very thin across the grain after resting.",whole,beefRef],
    ["brisket","Brisket","Braise or smoke","The flat slices neatly. The point has more marbling.","Cook slowly until probe-tender, often near 195–205°F for texture. Slice against the grain.",whole,["Slow Cooker Beef Brisket","https://www.recipetineats.com/slow-cooker-beef-brisket-with-bbq-sauce/"]],
    ["plate","Short ribs","Braise or grill","English-cut ribs are thick. Flanken ribs are thin crosscuts.","Braise thick ribs until tender. Marinate and grill thin flanken ribs quickly.",whole,["LA Galbi","https://www.koreanbapsang.com/la-galbi-gui-grilled-la-style-short-ribs/"]],
    ["flank","Flank steak","Sear or stir-fry","Look for a broad, even slab with a clearly visible grain.","Slice very thin across the grain before stir-frying, or grill whole and slice after resting.",whole,internal("beef-broccoli")],
    ["shank","Beef shank","Braise","Choose thick crosscuts with a central marrow bone.","Brown the slices and braise until the connective tissue softens.",whole,beefRef],
    ["","Ground beef","Skillet or grill","90/10 is handy for crumbles. 80/20 stays juicier in burgers.","Break into crumbles for a skillet, or shape patties gently and check the center.",ground,["Smash Burgers","https://www.seriouseats.com/ultra-smashed-cheeseburger-recipe"]]]},
  {id:"pork", name:"Pork", color:"#a9544a", summary:"Use lean loin cuts for a fast meal. Pick the shoulder or belly when you have time to render fat and soften connective tissue.", reference:porkRef,
   outline:"M145 77 Q238 62 370 72 Q425 75 440 113 Q454 149 423 168 L428 211 L409 211 L390 171 L367 162 Q301 180 206 167 L186 167 L179 211 L159 211 L154 165 L132 152 Q106 147 91 134 L52 133 L46 103 L81 95 L106 74 L121 62 Z",
   accents:["M431 97 q38-21 38-2 q-1 17-16 12 q-10-7 0-14","M89 106 l5 0","M56 113 l2 8","M106 76 l16 10"],
   zones:[
    ["shoulder","M146 78 L209 71 L207 132 L187 163 L155 164 L130 149 L116 126 Z",168,112],
    ["loin","M214 70 Q288 65 363 72 L351 115 L214 120 Z",278,91],
    ["ribs","M214 124 L351 119 L355 139 L208 143 Z",273,131],
    ["belly","M207 148 L359 144 L372 162 Q295 181 205 166 L192 165 Z",278,158],
    ["ham","M369 73 Q427 79 440 116 Q452 146 421 167 L389 169 L366 158 L356 118 Z",403,113]],
   cuts:[
    ["shoulder","Pork shoulder / Boston butt","Braise or slow-roast","Choose a marbled piece. Bone-in and boneless both work.","Cut into chunks to braise, or slow-roast whole until it pulls apart easily.",whole,carnitas],
    ["loin","Pork chop","Sear or grill","Choose thick chops for more time to brown the outside.","Pat dry, sear both sides, then lower the heat to cook through.",whole,porkRef],
    ["loin","Pork loin","Roast or stir-fry","Look for a lean roast or ask for thin-cut slices for a skillet.","Roast whole or slice across the grain for a quick sear.",whole,internal("ginger-pork")],
    ["loin","Pork tenderloin","Sear then roast","Look for a small, narrow piece with a uniform center.","Trim silverskin and tuck the thin tip under before roasting.",whole,porkRef],
    ["ribs","Back ribs","Roast or grill","Pick a rack with good meat coverage between the bones.","Cook covered at low heat until tender, then glaze over high heat.",whole,porkRef],
    ["belly","Pork belly","Braise or roast","Look for alternating layers of meat and fat.","Slow-cook to render the fat; finish hot for crisp edges.",whole,["Japanese Braised Pork Belly","https://www.justonecookbook.com/braised-pork-belly-kakuni/"]],
    ["ham","Fresh ham / leg","Roast","Check the label for raw, cured, or fully cooked.","Roast fresh ham with a thermometer and follow the label for cured ham.",whole,porkRef],
    ["","Ground pork","Stir-fry","Use a leaner blend for crumbles or a fattier blend for dumplings.","Brown in a hot skillet and break into small pieces.",ground,["Mapo Tofu","https://thewoksoflife.com/ma-po-tofu-real-deal/"]]]},
  {id:"chicken", name:"Chicken", color:"#97613a", summary:"Breast is lean and quick. Thighs are forgiving. Choose bone-in pieces when you want more time for the skin to crisp.", reference:["USDA poultry guide","https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/poultry"],
   outline:"M96 82 Q79 37 120 39 Q153 41 158 67 L201 102 Q250 76 317 95 Q366 106 391 104 L436 70 L427 103 L465 84 L444 120 L463 113 L423 146 Q414 183 365 188 L335 195 L342 218 L363 226 L328 226 L315 199 L293 195 L284 229 L310 236 L265 237 L270 192 Q220 184 181 167 Q141 151 123 110 L103 100 L82 91 Z",
   accents:["M114 59 l3 0","M107 43 q-5-16 6-15 q6 0 9 11 q4-16 12-10 q4 4 3 15","M151 103 q12 26 28 36"],
   zones:[
    ["breast","M170 99 L207 106 Q241 91 257 100 Q219 126 227 158 L213 177 Q182 166 161 142 Z",196,137],
    ["wing","M259 99 Q309 93 354 110 Q341 131 294 145 L247 152 Q219 139 252 111 Z",285,119],
    ["thigh","M297 149 Q328 141 364 122 Q382 112 403 131 Q409 153 377 178 L337 191 L307 184 Z",350,152],
    ["drumstick","M285 159 L307 154 Q330 167 321 188 L298 201 L274 190 L270 174 Z",295,178]],
   cuts:[
    ["breast","Chicken breast","Sear, roast, or poach","Aim for evenly sized boneless pieces for a fast skillet dinner.","Butterfly thick breasts into cutlets. Pat dry and cook just until the center is safe.",poultry,internal("lemongrass-chicken")],
    ["thigh","Chicken thigh","Sear or roast","Skinless boneless thighs are great for bowls. Bone-in skin-on thighs suit roasting.","Trim loose fat. Start skin-on thighs skin-side down and render gradually.",poultry,internal("teriyaki-chicken")],
    ["drumstick","Drumstick","Roast or grill","Look for even sizes so the pieces finish together.","Pat dry, season, and roast on a rack for crisp skin. Dark meat often gets more tender above the safe minimum.",poultry,["Crispy Baked Chicken Drumsticks","https://www.recipetineats.com/crispy-baked-chicken-drumsticks/"]],
    ["wing","Wing","Roast or air-fry","Buy split flats and drumettes for easy serving.","Pat very dry and space apart for crisp skin.",poultry,["Crispy Baked Chicken Wings","https://www.recipetineats.com/crispy-oven-baked-chicken-wings-oven-fried/"]],
    ["","Ground chicken","Skillet","A blend with dark meat stays juicier than all breast.","Break it into fine crumbles for rice bowls or cook patties gently.",poultry,internal("soboro-don")],
    ["","Whole chicken","Roast","A compact bird with intact skin roasts evenly.","Pat dry and season. Check both breast and the innermost thigh without touching bone.",poultry,["Roast Chicken","https://www.recipetineats.com/roast-chicken/"]]]},
  {id:"lamb", name:"Lamb", color:"#975a51", summary:"Rack and loin chops cook quickly. Shoulder and shank are better with time and moisture.", reference:lambRef,
   outline:"M139 83 Q165 60 195 78 Q217 61 244 76 Q268 61 298 77 Q332 64 359 82 Q407 74 431 109 L443 137 L433 166 L429 211 L410 211 L402 171 L376 170 Q293 199 214 169 L182 170 L174 212 L153 212 L149 169 L135 149 L111 151 L73 141 L56 124 L60 107 L77 95 L89 76 L108 90 L123 69 Z",
   accents:["M431 110 q32-1 30 19 q-5 10-15 5","M81 114 l5 0","M95 94 q14-14 24-8"],
   zones:[
    ["shoulder","M141 85 Q173 65 216 80 L218 144 L185 169 L151 164 L134 145 Z",177,116],
    ["rack","M220 82 L285 77 L283 143 L222 144 Z",252,112],
    ["loin","M289 79 L358 83 L361 133 L286 143 Z",323,108],
    ["leg","M362 84 Q413 78 432 112 L439 138 L426 169 L402 173 L376 167 L365 134 Z",402,118],
    ["breast","M221 148 L360 139 L372 166 Q293 190 216 168 Z",294,159],
    ["shank","M407 174 L429 171 L425 207 L413 208 Z",418,189]],
   cuts:[
    ["shoulder","Lamb shoulder","Braise or slow-roast","Choose an evenly marbled bone-in shoulder for slow cooking.","Season well and slow-roast covered until easily shredded.",whole,["Slow Roast Lamb Shoulder","https://www.recipetineats.com/slow-roast-lamb-shoulder/"]],
    ["rack","Rack of lamb","Sear then roast","Pick an even rack. Frenched ribs have the bone tips trimmed clean.","Sear the fat cap, then roast using a thermometer in the center.",whole,lambRef],
    ["loin","Loin chops","Sear or grill","Choose chops of similar thickness for even cooking.","Sear and check the temperature away from the bone.",whole,["Rosemary Garlic Grilled Lamb Chops","https://www.recipetineats.com/rosemary-garlic-grilled-lamb-chops/"]],
    ["leg","Leg of lamb","Roast or grill","A boneless tied roast is easy to carve. A butterflied leg is good on the grill.","Season well, roast to temperature, and slice across the grain.",whole,lambRef],
    ["breast","Lamb breast","Slow-roast","Choose a flat slab with good layers of lean meat.","Roast slowly so the fat renders, then crisp at high heat.",whole,lambRef],
    ["shank","Lamb shank","Braise","Choose uniform pieces that fit snugly in your pot.","Brown first, then braise in stock until fork-tender.",whole,["Slow Cooked Lamb Shanks","https://www.recipetineats.com/slow-cooked-lamb-shanks-in-red-wine-sauce/"]],
    ["","Ground lamb","Skillet or grill","Choose a moderately fatty blend for juicy patties or kofta.","Shape gently and cook through, checking the center.",ground,lambRef]]},
  {id:"seafood", name:"Seafood", color:"#56756c", summary:"Choose firm fish and keep it cold. Thickness matters more than weight when timing a fillet.", reference:["FDA guide to choosing seafood","https://www.fda.gov/consumers/consumer-updates/selecting-and-serving-fresh-and-frozen-seafood-safely"],
   outline:"M52 136 Q86 100 133 90 Q191 65 249 79 Q270 57 314 53 L307 84 Q371 89 425 116 L477 80 Q462 113 470 134 Q462 156 477 189 L424 151 Q369 183 303 187 L322 214 L267 189 Q156 202 76 164 L54 151 L74 145 Z",
   accents:["M101 122 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0-6 0","M139 107 q27 34 5 61","M175 146 q50-1 62 20 q-28 6-62-20"],
   zones:[
    ["loin","M146 94 Q229 69 306 86 L305 134 L150 133 Q150 113 146 94 Z",234,108],
    ["belly","M153 137 L309 138 L308 184 Q223 197 151 175 Z",238,158],
    ["tail","M310 87 Q377 93 424 118 L425 149 Q365 178 313 183 Z",363,133]],
   cuts:[
    ["loin","Center-cut fillet","Sear or roast","Choose a thick, even portion with firm flesh.","Pat dry, check for pin bones, and start skin-side down if searing.","145°F / 63°C",internal("miso-salmon")],
    ["belly","Salmon belly","Broil or grill","This fatty strip is thin. Buy pieces with similar thickness.","Cook briefly under high heat and watch for flare-ups.","145°F / 63°C",["Teriyaki Salmon","https://www.justonecookbook.com/teriyaki-salmon-recipe/"]],
    ["tail","Tail fillet","Roast or pan-sear","A tapered tail portion cooks quickly and is often economical.","Fold a very thin tip under itself or remove it earlier.","145°F / 63°C",internal("miso-salmon")],
    ["","Fish steak","Grill or roast","Look for even cross-sections about an inch thick.","Brush with oil and use a clean, hot grill. Check the thickest flesh away from bone.","145°F / 63°C",["Teriyaki Salmon","https://www.justonecookbook.com/teriyaki-salmon-recipe/"]],
    ["","Shrimp","Sear or stir-fry","Look for firm shrimp with a mild scent. Frozen peeled and deveined shrimp are convenient.","Thaw in the fridge, dry, and cook briefly in a single layer.","Flesh pearly and opaque throughout",internal("shrimp-fried-rice")]]}
];
