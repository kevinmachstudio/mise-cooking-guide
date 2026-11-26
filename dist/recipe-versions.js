const version = (time, description, amounts, steps, additions = []) => ({time,description,amounts,steps,additions});
const chicken = "165°F / 74°C";
const fish = "145°F / 63°C";
const ground = "160°F / 71°C";

// Each pair is restaurant-style, then fitness. Quantities are for the original recipe's yield.
export const recipeVersions = {
  "sesame-soy-spaghetti": [
    version(25,"Roasted sesame paste, black vinegar, and a chile-crisp finish.",{"rice vinegar":[2,"tbsp","Chinese black vinegar"],"sugar":2},{
      1:"Whisk soy sauce, black vinegar, sugar, and grated garlic with the sesame paste. Whisk in the sesame oil and enough warm pasta water to make a pourable dressing.",
      2:"Toss the spaghetti with the dressing. Finish with cucumber sticks, scallions, toasted sesame seeds, and chile crisp."
    },[[2,"tbsp","Chinese sesame paste"],[2,"tsp","Chile crisp"]]),
    version(25,"Less spaghetti and extra edamame and cucumber for a higher-protein bowl.",{"dry spaghetti":130,"soy sauce":[1.5,"tbsp","Reduced-sodium soy sauce"],"toasted sesame oil":.5,"sugar":[1,"tsp","Sugar"],"cucumber":180},{
      2:"Cook the edamame as directed on the bag and drain it. Toss it with the spaghetti, dressing, cucumber sticks, and a splash of pasta water. Top with sliced scallions and sesame seeds."
    },[[200,"g","Frozen shelled edamame"]])
  ],
  "vietnamese-egg-rolls": [
    version(75,"Double-fried rice-paper rolls with extra shrimp and a shattery crust.",{"ground pork":180,"raw shrimp":175},{
      3:`Heat about 1 inch of oil in a deep, heavy pan to 325°F / 163°C. Fry in uncrowded batches until light golden and the center reaches ${ground}. Rest on a wire rack. Raise the oil to 350°F / 177°C and fry briefly in batches until deeper gold and crisp. Drain on the rack.`
    }),
    version(60,"Oven-crisped wheat wrappers with lean ground turkey and shrimp.",{"rice paper":[12,"","Wheat egg-roll wrappers"],"ground pork":[220,"g","Lean ground turkey"],"neutral oil":[1,"tbsp","Neutral oil"]},{
      1:"Mince the shrimp and shallot and grate the carrot. Mix with the turkey, mushrooms, noodles, fish sauce, and pepper. Keep the filling cold while you work.",
      2:"Heat the oven to 425°F / 220°C. Divide the filling among the wheat wrappers. Fold the sides over, roll snugly, and seal the tip with a little water.",
      3:`Brush the rolls lightly with the oil and space them on a lined baking sheet. Bake until golden, turning halfway through, about 18–24 minutes. Check that the center of the thickest roll reaches ${chicken}.`
    })
  ],
  "teriyaki-chicken": [
    version(30,"A harder sear and a double brush of glossy teriyaki.",{"soy":3,"mirin":3,"sake":3,"sugar":2,"neutral":2},{
      2:"Transfer the cooked chicken to a plate. Reduce the glaze in the skillet until it leaves a trail when stirred, then return the chicken and turn it twice in the glaze. Slice thickly and spoon the remaining glaze over the rice."
    }),
    version(25,"Lean chicken breast, a smaller scoop of rice, and more edamame and cabbage.",{"chicken thighs":[175,"g","Chicken breast, boneless and skinless"],"cooked rice":85,"shelled":90,"red or green":100,"sugar":.5,"neutral":.5},{
      1:`Slice the breast into even cutlets. Pat dry, brush with the oil, and sear in a nonstick skillet until the center reaches ${chicken}.`
    })
  ],
  "gochujang-chicken": [
    version(35,"Charred thigh pieces in a thicker chile glaze with quick-pickled cucumber.",{"gochujang":3,"honey":2,"rice vinegar":3,"neutral":2,"toasted sesame":1},{
      0:"Toss sliced cucumber with half the vinegar and let it sit while the chicken cooks. Whisk the remaining vinegar with gochujang, soy, and honey. Warm the rice and slice the scallions.",
      2:"Let the glaze bubble briefly in the skillet before tossing it with the cooked chicken. Add sesame oil and scallions off the heat and serve with the drained cucumber."
    }),
    version(25,"Chicken breast and extra cucumber with a sharper, less sweet glaze.",{"chicken thighs":[185,"g","Chicken breast, boneless and skinless"],"cooked rice":80,"cucumber":150,"honey":.5,"rice vinegar":2,"neutral":.5},{
      1:`Cut the breast into even chunks. Sear in a nonstick skillet with the oil, turning as needed, until the center reaches ${chicken}. Reduce the heat before glazing.`
    })
  ],
  "miso-salmon": [
    version(35,"A short miso marinade and dark, caramelized edges.",{"white miso":3,"mirin":2,"sake":2,"sugar":1.5,"neutral":2},{
      0:"Whisk miso, mirin, sake, and sugar. Coat the salmon lightly and refrigerate for 15 minutes. While it marinates, start heating the oven to 425°F / 220°C.",
      1:"Toss the broccoli with oil and roast on a lined pan for 8 minutes. Scrape any thick pools of glaze off the fish so they do not burn.",
      2:`Put the salmon skin-side down next to the broccoli. Roast until nearly done, then briefly broil, watching closely, until the glaze colors and the center reaches ${fish}. Serve over warm rice.`
    }),
    version(25,"Extra broccoli, less rice, and a thin savory miso glaze.",{"salmon":170,"cooked rice":75,"broccoli":220,"sugar":.25,"neutral":.5},{
      0:"Heat the oven to 425°F / 220°C. Toss broccoli with the measured oil and spread it out on a large lined sheet pan. Roast it for 8 minutes before adding the fish."
    })
  ],
  "beef-broccoli": [
    version(35,"Silky velveted steak with plenty of glossy brown sauce.",{"oyster":2,"unsalted stock":5,"cornstarch":1.5,"neutral":2},{
      0:"Slice steak across the grain. Toss with a third of the starch and half the soy sauce. Refrigerate 10 minutes. Whisk the remaining starch and soy with the stock, oyster sauce, and sugar. Mince the garlic and warm the rice.",
      1:`Steam the broccoli. Sear the coated steak in hot oil in an uncrowded skillet, then cook to ${fish} and rest 3 minutes.`
    }),
    version(25,"More trimmed flank and broccoli, with a smaller scoop of rice.",{"flank":175,"cooked rice":75,"broccoli":220,"neutral":.75,"sugar":.25},{
      1:`Steam the broccoli in two batches if needed. Trim visible fat from the flank before searing, and cook the thickest pieces to ${fish}. Rest for 3 minutes.`,
      2:"Add garlic, ginger, and sauce to the hot pan. Once the sauce bubbles and turns glossy, toss with the steak and broccoli. Serve in wide bowls so the rice catches the sauce."
    })
  ],
  "basil-chicken": [
    version(25,"A chile-forward skillet with heaps of basil and a crisp fried egg.",{"holy basil":22,"garlic":3,"thai chile":2,"neutral":3,"oyster":2},{
      2:"Use the remaining oil to fry the egg, spooning hot oil over the edges until lacy. Cook until the white and yolk are firm. Serve over rice and the basil chicken."
    }),
    version(22,"Extra lean chicken and peas with a smaller scoop of rice.",{"lean ground":180,"cooked rice":80,"neutral":.75,"sugar":.25},{
      1:`Brown the chicken, garlic, and chile in the measured oil. Add the peas with the sauce and cook until the chicken reaches ${chicken}. Fold in basil off the heat.`,
      2:"Cook the egg in a nonstick skillet until the white and yolk are firm. Top the chicken, peas, and rice with the egg."
    },[[75,"g","Frozen peas"]])
  ],
  "shrimp-fried-rice": [
    version(25,"Golden egg, separated grains, and a final toss over high heat.",{"large eggs":2,"cooked rice":175,"scallions":18,"neutral":2.5},{
      2:"Fry the carrot and peas first. Add the rice and spread it out against the hot skillet before tossing. Work in batches if necessary. Once the rice reaches 165°F / 74°C, add soy around the pan edge, then fold in the shrimp, eggs, scallions, and sesame oil."
    }),
    version(20,"More shrimp and vegetables in every forkful, with less rice and oil.",{"shrimp":200,"cooked rice":85,"frozen peas":85,"carrots":90,"neutral":.75},{
      2:"Toss the diced carrots until tender, add peas, and let excess moisture cook off before adding rice and soy. Heat the rice to 165°F / 74°C before folding in the cooked shrimp, egg, scallions, and sesame oil."
    })
  ],
  "soboro-don": [
    version(25,"A bento-style bowl with finely crumbled egg and deep ginger flavor.",{"large eggs":2,"fresh ginger":1.25,"mirin":2,"sugar":1.5},{
      2:"Scramble the eggs in the oil over low heat, stirring continuously with chopsticks or a fork until fully set in fine curds. Arrange the egg, chicken, and peas in three stripes over the rice."
    }),
    version(25,"More lean chicken and peas, with a smaller bed of rice.",{"lean ground":185,"cooked rice":80,"frozen peas":100,"sugar":.5,"neutral":.5},{
      2:"Cook the egg until set in a nonstick skillet with the measured oil. Serve the chicken and peas over the small bed of rice and crumble the egg on top."
    })
  ],
  "braised-tofu": [
    version(30,"A crisp tofu crust with a thicker chile-scallion braise.",{"scallions":20,"gochugaru":1,"toasted sesame":1,"neutral":2},{
      1:"Dry the tofu thoroughly and cook in the oil in an uncrowded skillet until the broad faces are deeply golden. Whisk the braising ingredients while it browns.",
      2:"Add the braise around the tofu and simmer uncovered, basting the top until the liquid clings to the edges. Serve straight from the pan with the edamame and rice."
    }),
    version(25,"A tofu and edamame bowl with more plant protein and less rice.",{"extra-firm":230,"shelled":140,"cooked rice":65,"neutral":.5,"sugar":.25},{
      1:"Brush dry tofu with the measured oil and brown in a nonstick pan. Whisk soy, water, gochugaru, sugar, sesame oil, garlic, and scallions while the tofu sears."
    })
  ],
  "lemongrass-chicken": [
    version(60,"Marinated chicken thighs with charred edges and punchier nước chấm.",{"chicken breast":[185,"g","Chicken thighs, boneless and skinless"],"minced lemongrass":3,"lime juice":3,"sugar":2,"neutral":2},{
      0:"Coat the thighs with lemongrass, garlic, half the fish sauce, one-third of the sugar, and the oil. Refrigerate for 30 minutes.",
      2:`Grill or sear over medium-high heat, turning until the edges char and the center reaches ${chicken}. Slice across the grain and serve with the noodles, vegetables, herbs, and dressing.`
    }),
    version(35,"More chicken and fresh vegetables with a smaller portion of vermicelli.",{"chicken breast":205,"dry rice":40,"cucumber":105,"carrots":70,"leaf lettuce":95,"lime juice":3,"sugar":1},{
      2:`Sear the cutlets until the center reaches ${chicken}. Slice and arrange over the lettuce, cucumber, carrots, and noodles. Toss with herbs and the lime dressing just before eating.`
    })
  ],
  "ginger-pork": [
    version(25,"Juicy thin-cut pork with a more concentrated ginger and miso pan glaze.",{"pork loin":[165,"g","Boneless pork shoulder, thinly sliced"],"fresh ginger":2.5,"mirin":3,"white miso":1.5,"neutral":1.5},{
      1:`Sear thin shoulder slices in an uncrowded skillet until the center reaches ${fish}. Rest for 3 minutes, then briefly reduce the ginger sauce in the pan.`,
      2:"Fan the rested pork next to the cabbage and rice. Brush with the pan glaze just before serving."
    }),
    version(20,"Trimmed pork loin with extra cabbage and a smaller serving of rice.",{"pork loin":180,"cooked rice":80,"red or green":165,"neutral":.5,"fresh ginger":2},{
      1:`Trim visible fat, pat the loin dry, and sear in the measured oil. Cook to ${fish} and rest 3 minutes.`,
      2:"Reduce the glaze over medium-low heat and spoon it over the pork. Pile the shredded cabbage beside the rice and pork."
    })
  ],
  "protein-yogurt-oats": [
    version(15,"A layered café-style yogurt cup with toasted oats and extra berries.",{"dry rolled":70,"mixed berries":145,"maple":16},{
      1:"Toast the oats in a dry skillet until nutty, then cool. Layer yogurt, berries, and toasted oats in a glass. Drizzle maple between the layers and serve right away."
    }),
    version(10,"A thicker, protein-forward parfait with more berries and less syrup.",{"plain nonfat":350,"whey":30,"dry rolled":40,"mixed berries":150,"maple":4},{
      1:"Crush some of the berries into the yogurt to sweeten it. Fold in oats and top with the remaining berries and the measured maple."
    })
  ],
  "turkey-egg-skillet": [
    version(35,"A diner-style skillet with extra-crisp potatoes, jammed into an egg and turkey hash.",{"large eggs":150,"liquid egg":115,"potatoes":200,"olive oil":10},{
      0:"Boil diced potatoes until just tender. Drain and steam dry, then press them into a single layer in the oiled skillet. Leave undisturbed until the first side is deeply golden before turning."
    }),
    version(30,"More turkey, egg whites, and spinach, with a smaller potato portion.",{"large eggs":50,"liquid egg":240,"cooked turkey":135,"potatoes":120,"baby spinach":95,"olive oil":4},{
      2:`Fold the measured whole egg and whites through the turkey and vegetables over medium-low heat until set and at least ${ground}.`
    })
  ],
  "chicken-quinoa-broccoli": [
    version(35,"Bistro-style charred broccoli and a bright lemon pan dressing.",{"broccoli":175,"olive oil":15,"lemon juice":40},{
      2:"Roast the broccoli at 450°F / 230°C with some of the remaining oil until browned. Add lemon juice and the rest of the oil to the warm chicken skillet off heat, scraping up the browned bits. Spoon over the sliced chicken, roasted broccoli, and quinoa."
    }),
    version(30,"More broccoli, a measured serving of quinoa, and a lighter lemon dressing.",{"raw boneless":260,"cooked quinoa":95,"broccoli":230,"olive oil":5},{
      2:"Steam the broccoli until bright green and warm the quinoa. Toss the vegetables with the lemon and remaining oil, then serve with sliced chicken."
    })
  ],
  "lean-turkey-taco-bowl": [
    version(30,"A taco-shop bowl with crisp-edged turkey, extra salsa, and fanned avocado.",{"tomato salsa":95,"avocado":65},{
      0:`Press turkey into a hot nonstick skillet and let the first side brown before breaking it apart. Season with the listed optional spices and cook to ${chicken}. Stir in a spoonful of the measured salsa to lift the pan juices.`,
      1:"Warm beans and rice. Top with browned turkey, then fan sliced avocado alongside and spoon over the remaining salsa."
    }),
    version(25,"More beans and lean turkey, less rice, and a little avocado for the finish.",{"raw 93%":240,"cooked or canned":140,"cooked rice":80,"avocado":30},{
      1:"Start the bowl with beans and a small layer of rice. Pile on the turkey and use the salsa to coat the beans. Finish with thin slices of avocado."
    })
  ],
  "sesame-shrimp-edamame-bowl": [
    version(30,"A seared shrimp and charred broccoli bowl with a fuller sesame finish.",{"broccoli":140,"toasted sesame":9,"soy sauce":14},{
      0:"Cook the edamame and warm rice. Cut the broccoli into bite-size florets and char the cut sides in a hot skillet with a little of the measured sesame oil. Add a splash of water and cover briefly to finish.",
      2:"Off heat, toss shrimp with soy and the rest of the sesame oil. Top the warm rice with broccoli, shrimp, and edamame."
    }),
    version(25,"More edamame and broccoli with a smaller portion of rice.",{"raw shrimp":235,"shelled":170,"broccoli":180,"cooked rice":70,"toasted sesame":3},{
      2:"Toss the shrimp and edamame with soy and the measured sesame oil. Spoon them over the broccoli and rice."
    })
  ],
  "salmon-lentils-kale": [
    version(30,"Crisp-skinned salmon with lemon yogurt and a warm lentil ragout.",{"raw salmon":225,"plain nonfat":120,"lemon juice":25},{
      0:`Pat salmon dry and place skin-side down in a dry nonstick skillet. Once the skin crisps and releases, flip and finish over lower heat to ${fish}.`,
      2:"Whisk the yogurt with lemon until pourable. Spoon warm lentils and kale into a shallow bowl, place the fish skin-side up, and spoon the yogurt around it."
    }),
    version(25,"A generous lentil and kale base with a slightly smaller salmon portion.",{"raw salmon":170,"cooked lentils":160,"chopped kale":140,"plain nonfat":110},{
      1:"Simmer lentils and kale with a splash of water until the kale is tender. Add the kale in two handfuls if it fills the saucepan."
    })
  ],
  "seolleongtang": [
    version(420,"A richer milky broth with more marrow bones and finely sliced beef.",{"beef leg":1.4,"oxtail":600,"water":4.5,"dry somyeon":200,"scallions":6},{
      2:`Add the brisket for the last 1½–2 hours. Once tender, lift it out and strain the broth through a fine sieve. Taste and reduce briefly if the broth seems thin. Slice the brisket thinly across the grain and reheat the oxtail meat in the broth to ${chicken}.`
    }),
    version(390,"More trimmed brisket, a smaller noodle portion, and napa cabbage in the broth.",{"oxtail":300,"beef brisket":500,"dry somyeon":100,"fine salt":.5},{
      2:`Trim visible fat from the brisket before adding it for the last 1½–2 hours. Strain and skim the broth. Return the pulled oxtail meat and reheat to ${chicken}.`,
      3:"Cook the measured noodles separately. Simmer sliced napa in the broth until tender, then ladle over the noodles with thin slices of brisket, oxtail, and scallions. Season with the measured salt and pepper."
    },[[240,"g","Napa cabbage"]])
  ],
  "spicy-galbijjim": [
    version(190,"A sticky, pear-sweetened braise with extra rice cakes and a sesame finish.",{"gochujang":2.5,"brown sugar":3,"asian pear":165,"cylindrical":270},{
      3:"Remove the tender ribs and squash briefly while you reduce the sauce to a glaze. Return them, spoon sauce over the ribs, and finish with scallions and toasted sesame."
    },[[2,"tsp","Toasted sesame seeds"]]),
    version(170,"Trimmed ribs with more squash, fewer rice cakes, and a less sweet sauce.",{"soy sauce":3/16,"brown sugar":1,"kabocha":550,"cylindrical":100},{
      0:"Trim thick surface fat from the ribs. Blanch, drain, and rinse them. Mix stock, soy, gochujang, flakes, brown sugar, pear, garlic, and ginger in the pot.",
      3:"Skim the sauce again before reducing. Spoon the ribs, squash, and rice cakes into bowls with the scallions."
    })
  ],
  "shaking-beef": [
    version(40,"Filet mignon in deeply browned cubes over a steakhouse-style watercress salad.",{"top sirloin":[380,"g","Filet mignon"],"neutral":1.5,"red onion":100},{
      1:`Drain the cubes well. Sear in batches in a very hot skillet without moving them until the first face browns. Turn and brown the rest, checking for ${fish} in the center. Rest 3 minutes.`
    }),
    version(35,"Trimmed top sirloin with a bigger pile of watercress and less oil.",{"top sirloin":[360,"g","Top sirloin, trimmed"],"sugar":1,"neutral":[2,"tsp","Neutral oil"],"red onion":100,"watercress":150},{
      2:"Shake the vinegar off the red onion. Toss it with the watercress and pile the rested steak on top. Serve with the lime, salt, and pepper dip."
    })
  ],
  "banh-khot": [
    version(55,"Coconut-rich batter with crisp, shallow edges and shrimp pressed into each cake.",{"unsweetened coconut":150,"cold water":180,"neutral":3.5},{
      1:"Brush oil into a preheated bánh khọt pan and up the edges of each well. Stir the batter before each batch, pour a scant tablespoon into each well, and press a shrimp piece into the center. Cover 2–3 minutes."
    }),
    version(50,"Extra shrimp and lettuce wraps with a thinner coconut batter and less oil.",{"unsweetened coconut":[90,"mL","Light unsweetened coconut milk"],"cold water":240,"small raw shrimp":280,"neutral":1.5,"lettuce leaves":14},{
      1:"Use a well-seasoned or nonstick pan and a silicone brush to spread the measured oil in thin coats. Add a scant tablespoon of batter and two small shrimp pieces in each well. Cover 2–3 minutes.",
      2:"Uncover and cook until the shrimp are opaque and pearly throughout and the edges lift cleanly. Rebrush the wells lightly with oil between batches."
    })
  ],
  "surf-turf-pho": [
    version(200,"A more generous topping of beef and shrimp with onion and herbs on the side.",{"bone-in beef":1100,"unsalted beef":2.3,"star anise":4,"raw shrimp":330},{
      3:"Poach shrimp in the simmering broth until opaque and pearly throughout. Fill warm bowls with noodles, ribs, shrimp, and broth. Finish with fine onion slices, Thai basil, scallions, lime, and jalapeño."
    },[[70,"g","White onion, thinly sliced"],[20,"g","Thai basil"]]),
    version(190,"More shrimp and bean sprouts, fewer noodles, and broth skimmed before serving.",{"bone-in beef":700,"dry flat":180,"raw shrimp":360,"sugar":1},{
      3:"Poach shrimp in the skimmed simmering broth until opaque and pearly throughout. Add the bean sprouts for the last minute. Fill bowls with noodles, beef, shrimp, sprouts, and broth, then finish with the garnishes."
    },[[200,"g","Bean sprouts"]])
  ],
  "big-rib-bun-bo-hue": [
    version(195,"A red annatto and lemongrass slick over a thick-noodle bowl.",{"bone-in beef":1150,"lemongrass":4,"annatto oil":3,"dried chile":2.5},{
      2:"Strain the dissolved shrimp paste into the broth, then add fish sauce, sugar, and two-thirds of the aromatic oil. Simmer 5 minutes. Finish each assembled bowl with a little of the remaining oil."
    }),
    version(185,"Trimmed ribs, lots of cabbage, and a smaller serving of noodles.",{"bone-in beef":800,"fish sauce":1.5,"annatto oil":1,"dry thick":185,"finely shredded":300},{
      0:"Trim thick surface fat from the ribs, then blanch for 8 minutes and rinse. Simmer with two-thirds of the bruised lemongrass, stock, and onion until fork-tender, 2–2½ hours. Skim the surface before seasoning the broth."
    })
  ],
  "pork-shrimp-siu-mai": [
    version(50,"Bouncy dim sum filling with bigger chunks of shrimp and a bright carrot top.",{"raw shrimp":180,"fresh shiitake":55,"toasted sesame":1.5},{
      0:"Mix the pork, mushrooms, soy, starch, wine, sesame oil, sugar, and pepper until sticky. Chop half the shrimp finely and leave the other half coarser. Fold in both and chill until wrapping."
    }),
    version(45,"Shrimp-heavy filling with lean ground chicken and extra shiitake.",{"ground pork":[190,"g","Lean ground chicken"],"raw shrimp":190,"fresh shiitake":75,"toasted sesame":.5,"sugar":.5},{
      0:"Stir chicken, chopped shrimp, shiitake, soy, starch, wine, sesame oil, sugar, and pepper until the mixture turns sticky. Keep cold until wrapping.",
      2:`Steam over boiling water with space between pieces. Cook until the centers reach ${chicken}, checking a dumpling in the middle of the basket.`
    })
  ],
  "black-bean-spareribs": [
    version(60,"Teahouse-style ribs steamed in individual shallow dishes with extra douchi.",{"fermented black":1.5,"garlic":3,"ginger":1.5,"toasted sesame":1.5},{
      1:`Divide among small heatproof dishes in single layers. Steam in batches until tender and at least ${fish} away from the bone, about 15–20 minutes. Keep the juices in the dishes.`
    }),
    version(45,"Black-bean steamed pork loin with broccoli to catch the steaming juices.",{"pork spareribs":[500,"g","Pork loin, cut into bite-size pieces"],"sugar":.5,"toasted sesame":.5},{
      0:"Marinate the loin pieces in rinsed chopped black beans, garlic, ginger, wine, oyster sauce, sugar, starch, and sesame oil for 20 minutes in the refrigerator.",
      1:`Steam in a single layer until the thickest pieces reach ${fish}. Rest 3 minutes. Steam the broccoli separately until crisp-tender.`,
      2:"Serve the pork over broccoli with the steaming juices and sliced scallion."
    },[[300,"g","Broccoli florets"]])
  ],
  "pork-soup-dumplings": [
    version(235,"A juicier dumpling with more broth jelly and a ginger-vinegar dip.",{"low-sodium":220,"unflavored":7,"chinkiang":3},{
      1:"Mix flour and warm water, knead 6–8 minutes until smooth, then cover and rest for 30 minutes. Mix the pork, soy sauce, wine, sesame oil, sugar, and half the ginger until sticky. Fold in chilled, finely diced broth jelly.",
      3:`Steam in batches until a test dumpling reaches ${ground}. Serve with vinegar mixed with the remaining ginger. Let each dumpling cool briefly on a spoon before opening.`
    }),
    version(220,"Lean pork filling seasoned with extra ginger and measured sesame oil.",{"ground pork":[240,"g","Lean ground pork"],"toasted sesame":.5,"ginger":3,"sugar":.25},{
      1:"Mix flour and warm water, knead 6–8 minutes until smooth, then cover and rest for 30 minutes. Stir the chilled lean pork, soy, wine, sesame oil, ginger, and sugar until tacky. Fold in the cold stock jelly without crushing it and keep refrigerated until wrapping."
    })
  ],
  "lobster-har-gow": [
    version(60,"Lobster-forward translucent dumplings with a butter finish.",{"raw lobster":180,"raw shrimp":110,"unsalted butter":3},{
      3:"Steam in a lined basket until the filling is firm and opaque throughout, about 6–8 minutes. Transfer carefully to a warm plate and drizzle with a little melted butter. Serve the rest for dipping."
    }),
    version(55,"Lobster and shrimp dumplings with a light ginger-vinegar dip.",{"raw lobster":155,"raw shrimp":155,"sugar":.25,"unsalted butter":0},{
      3:"Steam in a lined basket until the filling is firm and opaque throughout, about 6–8 minutes. Stir grated ginger into the vinegar and serve alongside."
    },[[2,"tbsp","Chinkiang black vinegar"],[.5,"tsp","Extra grated ginger for the dip"]])
  ],
  "grilled-galbi": [
    version(115,"Pear-marinated short ribs with deep grill marks and a full scallion salad.",{"asian pear":150,"brown sugar":1.5,"scallions":9,"toasted sesame seeds":2},{
      0:"Whisk soy, pear, sugar, garlic, and half the sesame oil. Coat the ribs, cover, and refrigerate for 90 minutes."
    }),
    version(70,"Lean sirloin with the pear-galbi marinade, scallion salad, and lettuce cups.",{"boneless beef":[640,"g","Top sirloin steaks, about ¾ inch thick"],"brown sugar":.5,"toasted sesame oil":1.5,"scallions":8},{
      0:"Whisk soy, pear, sugar, garlic, and half the sesame oil. Coat sirloin and refrigerate at least 45 minutes.",
      2:`Discard the used marinade and grill the sirloin over medium-high, turning until browned and the center reaches ${fish}. Rest 3 minutes and slice across the grain.`,
      3:"Wrap the sirloin and scallion salad in the lettuce leaves."
    },[[12,"","Butter lettuce leaves"]])
  ],
  "crispy-eggplant-curry": [
    version(50,"A rich coconut curry served under crisp eggplant and plenty of fried shallots.",{"neutral":4,"cornstarch":2.5,"unsweetened coconut":450,"water":80,"crispy fried":35},{
      3:"Pour the curry into warm shallow bowls. Stack the eggplant on top at the last minute and finish with torn basil and fried shallots."
    }),
    version(50,"A lighter coconut sauce with baked eggplant, edamame, and basil.",{"neutral":1.5,"unsweetened coconut":[300,"mL","Light unsweetened coconut milk"],"water":180,"brown sugar":.5,"crispy fried":10},{
      2:"Fry the paste and spices briefly in the remaining oil. Add the light coconut milk and water, simmer 10 minutes, and stir in edamame cooked according to the package. Season with fish sauce, sugar, and lime."
    },[[250,"g","Shelled edamame"]])
  ],
  "shaoxing-crab-noodles": [
    version(40,"Banquet-style rice noodles with generous crab and fragrant ginger-scallion chicken fat.",{"cooked dungeness":470,"unsalted shaoxing":75,"rendered chicken":2.5,"fresh ginger":30,"scallions":5},{
      2:`Fold crab gently into the hot sauce. If using cooked leftovers, reheat to ${chicken}. Spoon over warm noodles and finish with thin scallion curls.`
    }),
    version(35,"Less noodle and chicken fat, with extra crab and bok choy.",{"cooked dungeness":420,"fresh wide":400,"rendered chicken":[2,"tsp","Rendered chicken fat"]},{
      0:"Loosen the noodles according to their package. Steam the split baby bok choy until crisp-tender and divide it among warm bowls with the noodles. Pat the cooked crab dry."
    },[[280,"g","Baby bok choy"]])
  ],
  "napa-seafood-hot-pot": [
    version(50,"A seafood-house pot with extra shrimp, scallops, and shiitake broth.",{"dried shiitake":30,"raw shrimp":300,"scallions":3},{
      2:`Add cod and simmer gently. Add shrimp and scallops toward the end. Check that the cod reaches ${fish} and the shellfish are firm and opaque throughout.`
    },[[180,"g","Raw sea scallops"]]),
    version(45,"A vegetable-heavy seafood pot with extra cod and just a little sesame oil.",{"napa cabbage":560,"daikon":290,"skinless cod":465,"korean soup":.75,"toasted sesame":.5},{
      3:"Finish with the sesame oil and scallions. Divide the cod, shrimp, and vegetables evenly among deep bowls and ladle over the broth."
    })
  ],
  "cats-ear-lamb-noodles": [
    version(85,"A deeply browned lamb ragù and hand-shaped noodles tossed in the sauce.",{"ground lamb":500,"neutral":1.5,"tomato paste":2,"canned crushed":480},{
      1:`Brown the lamb over medium-high, leaving the first side undisturbed for a few minutes before breaking it up. Cook to ${ground}. Soften onion and garlic, toast cumin, coriander, chile, and tomato paste, then add tomatoes and soy. Simmer until thick enough to cling.`
    }),
    version(75,"A smaller handmade noodle portion with a lean lamb and mushroom ragù.",{"all-purpose":240,"warm water":116,"ground lamb":[400,"g","Lean ground lamb"],"canned crushed":450},{
      1:`Brown the lamb in oil and cook to ${ground}. Stir in minced mushrooms and onion and cook until their released moisture evaporates. Add garlic, cumin, coriander, chile, tomato paste, tomatoes, and soy. Simmer until spoonable.`
    },[[250,"g","Cremini mushrooms"]])
  ],
  "garlic-butter-salmon": [
    version(40,"A grill-style plate with browned garlic butter and crisp balsamic sprouts.",{"unsalted butter":3,"garlic":3,"balsamic":3},{
      2:`Baste with melting butter and garlic over low heat, letting the butter turn nutty without burning the garlic. Cook the salmon to ${fish}, then add lemon off heat and serve with rice and sprouts.`
    }),
    version(35,"A smaller rice portion and extra Brussels sprouts with measured garlic butter.",{"brussels":420,"cooked rice":150,"unsalted butter":[2,"tsp","Unsalted butter"],"honey":.5},{
      2:`Cook salmon to ${fish}. Warm the measured butter and garlic just until fragrant, stir in lemon, and spoon over the fish. Serve with sprouts and rice.`
    })
  ],
  "dynamite-shrimp-bowl": [
    version(35,"A crisp shrimp coating with extra spicy mayo, like a fish-grill bowl.",{"cornstarch":55,"neutral":5,"mayonnaise":4,"sriracha":3},{
      2:"Assemble the bowls first. Toss half the hot shrimp quickly in a thin coat of sauce, then top with the rest of the shrimp and drizzle with remaining sauce. Finish with cilantro."
    }),
    version(30,"Seared shrimp and cabbage with a tangy yogurt-sriracha sauce.",{"raw shrimp":340,"cooked rice":155,"cornstarch":0,"neutral":[2,"tsp","Neutral oil"],"mayonnaise":[90,"g","Plain nonfat Greek yogurt"],"honey":.5},{
      0:"Mix yogurt, sriracha, lime, and honey. Dry and salt the shrimp. Warm the rice and char the corn in a dry skillet.",
      1:"Sear shrimp in the measured oil until opaque and pearly throughout.",
      2:"Line the bowls with shredded cabbage and the measured rice. Add corn, tomato, shrimp, and cilantro. Spoon yogurt sauce over the top."
    },[[150,"g","Shredded cabbage"]])
  ],
  "cajun-shrimp-tacos": [
    version(35,"Griddle-toasted tortillas with buttery blackened shrimp and extra pickled onion.",{"red onion":90,"rice vinegar":3,"unsalted butter":1.5,"cajun":2.5},{
      2:"Toast tortillas briefly on a hot dry skillet until spotted. Fill with cabbage, shrimp, charred corn, tomato, drained onion, and cilantro. Pipe or spoon the spicy mayo over the top."
    }),
    version(30,"More Cajun shrimp, extra slaw, corn tortillas, and yogurt crema.",{"raw shrimp":335,"small flour":[4,"","Small corn tortillas"],"shredded cabbage":165,"unsalted butter":[2,"tsp","Unsalted butter"],"mayonnaise":[70,"g","Plain nonfat Greek yogurt"]},{
      0:"Pickle the onion in vinegar and sugar while you cook. Whisk yogurt, sriracha, and lime juice to make the crema.",
      2:"Warm the corn tortillas in a dry skillet until pliable. Fill with the cabbage, shrimp, corn, tomato, drained onion, and cilantro. Add the yogurt crema."
    })
  ],
  "panda-orange-chicken": [
    version(45,"An extra-crisp takeout coating with a thicker orange glaze.",{"cornstarch":90,"all-purpose":55,"neutral":7,"orange zest":2,"brown sugar":4},{
      1:`Shallow-fry in batches, leaving room between pieces. Turn once the first side is crisp. Cook to ${chicken}, drain on a rack, and glaze only right before serving.`
    }),
    version(40,"Oven-crisp chicken breast in a brighter, less sweet orange glaze.",{"chicken thighs":[620,"g","Chicken breast, boneless and skinless"],"cornstarch":42,"all-purpose":0,"neutral":[3,"tsp","Neutral oil"],"orange zest":2,"brown sugar":1.5},{
      0:"Heat the oven to 425°F / 220°C. Toss chicken breast chunks with beaten egg and drain excess. Reserve a tablespoon of starch for the glaze, then toss the chicken in the remaining starch.",
      1:`Brush the oil on the coated chicken and arrange it on a lined sheet without crowding. Turn halfway and cook until lightly crisp and ${chicken} at the center.`
    })
  ],
  "panda-string-bean-chicken": [
    version(30,"Velveted chicken and blistered beans in glossy takeout sauce.",{"green beans":275,"unsalted chicken stock":100,"oyster sauce":1.5,"cornstarch":3,"neutral":1.5},{
      0:"Slice the chicken across the grain and toss it with half the starch and a little soy sauce. Refrigerate for 10 minutes. Trim beans and slice onion. Whisk stock, remaining soy, oyster sauce, sugar, and starch for the glaze.",
      2:"Stir-fry beans in a very hot pan so a few sides blister, then add onion. When crisp-tender, add garlic, ginger, and sauce. Bubble until glossy and return the chicken to coat."
    }),
    version(25,"More chicken and green beans with less oil and a less sweet glaze.",{"chicken breast":370,"green beans":380,"yellow onion":105,"sugar":.5,"neutral":[2,"tsp","Neutral oil"]},{
      2:"Stir-fry beans and onion in batches so they stay crisp. Add the garlic and ginger, then boil the sauce until glossy and toss it through the chicken and vegetables."
    })
  ],
  "panda-chow-mein": [
    version(30,"Chewy, browned noodles with savory dark soy and a crisp onion finish.",{"fresh chow":425,"neutral":3,"dark soy":1.5,"toasted sesame":1.5},{
      2:"Add noodles in two batches, spreading them against the hot skillet for a few seconds before tossing so the edges brown. Add sauce around the sides and toss with the vegetables."
    }),
    version(35,"Chicken and extra cabbage in a vegetable-forward chow mein.",{"fresh chow":230,"shredded cabbage":360,"celery":150,"neutral":1.5,"soy sauce":1.5},{
      1:`Use half the oil to sear the thinly sliced chicken in a hot skillet to ${chicken}, then transfer to a plate. Stir-fry celery, onion, cabbage, and garlic in the remaining oil until crisp-tender.`,
      2:"Add noodles and sauce and toss over high heat. Return the cooked chicken and toss just until hot."
    },[[420,"g","Chicken breast, boneless and skinless"]])
  ],
  "koi-char-siu-bao": [
    version(145,"Steamed buns with a generous sticky char siu filling.",{"cooked char siu":290,"oyster sauce":1.5,"cold water":75,"cornstarch":1.25},{
      1:"Simmer chopped char siu with oyster, soy, and the remaining sugar. Whisk cold water with starch and add gradually. Cook until the sauce holds its shape on a spoon and chill in a shallow dish before filling."
    }),
    version(135,"Tender steamed buns filled with lean char siu and shiitake.",{"sugar":1.25,"cooked char siu":[210,"g","Cooked lean char siu pork loin, chopped"],"oyster sauce":.75},{
      1:"Finely dice the shiitake and simmer it with the chopped char siu, oyster sauce, soy sauce, and remaining sugar. Stir cold water and starch, add, and simmer until thick enough to hold its shape. Chill before filling."
    },[[90,"g","Fresh shiitake mushrooms"]])
  ],
  "koi-daikon-cake": [
    version(175,"Thick dim sum slices with more lap cheong and a punchy XO finish.",{"lap cheong":95,"dried shrimp":24,"neutral":3,"xo sauce":3},{
      3:`Cut into thick slices and pan-fry in the remaining oil until both faces are browned and the center reaches ${chicken}. Blot on a rack and spoon XO sauce over each slice.`
    }),
    version(170,"Daikon slices with shiitake, less sausage, and a light brush of oil.",{"lap cheong":35,"neutral":[3,"tsp","Neutral oil, divided"],"xo sauce":1},{
      1:"Fry the finely diced shiitake with the sausage and dried shrimp in half the oil. Whisk rice flour, cornstarch, salt, and pepper with the measured liquid. Stir into the daikon with the sausage, shrimp, mushrooms, and scallions. Cook over low heat until paste-like.",
      3:`Brush firm slices lightly with the remaining oil and brown in a nonstick pan. Heat the center to ${chicken}. Serve with the measured XO sauce.`
    },[[85,"g","Fresh shiitake mushrooms"]])
  ],
  "di-san-xian": [
    version(40,"A wok-style finish with crisp potatoes, silky eggplant, and more garlic sauce.",{"neutral":4,"garlic":4,"cornstarch":2.5,"water":75},{
      1:"Use a wide skillet and fry the potatoes and eggplant in separate batches so their edges brown. Let them drain on a rack as you stir-fry the pepper.",
      2:"Add the garlic to the crisp pepper, then return the potatoes and eggplant. Stir the sauce, pour it around the skillet, and toss just until the vegetables are glossy."
    }),
    version(40,"Oven-browned vegetables with less oil and shelled edamame.",{"yukon":185,"green bell":240,"neutral":1.25,"sugar":.5},{
      1:"Heat the oven to 450°F / 230°C. Toss the potatoes and starch-coated eggplant in most of the oil. Spread them apart on a lined pan and roast until browned and tender, about 20–25 minutes, turning halfway.",
      2:"Stir-fry pepper and garlic in the remaining oil. Add edamame cooked according to the package and the roasted vegetables, then toss with the sauce until glossy."
    },[[210,"g","Shelled edamame"]])
  ],
  "beijing-fried-sauce-noodles": [
    version(45,"A concentrated pork and bean sauce with fresh wheat noodles.",{"ground pork":370,"fermented yellow":55,"sweet flour":30,"shaoxing":1.5},{
      2:"Fry the mixed bean sauce with the browned pork, stirring until it thickens and the oil begins to bead at the edges. Boil the fresh noodles separately and drain well."
    }),
    version(40,"Ground turkey, extra cucumber and carrot, and fewer noodles.",{"fresh wheat":280,"ground pork":[400,"g","Lean ground turkey"],"fermented yellow":35,"sweet flour":18,"cucumber":245,"carrots":175},{
      1:`Brown turkey in the oil, breaking it into crumbles. Stir in scallion whites, ginger, and Shaoxing wine. Continue cooking until the turkey reaches ${chicken}.`
    })
  ],
  "shanghai-scallion-oil-noodles": [
    version(30,"Deep scallion flavor and crisp greens piled over the noodles.",{"scallions":170,"neutral":4,"dark soy":2.5},{
      1:"Fry the whites and then the greens gently until fragrant and golden. Lift the scallions out as they finish so the thinner pieces don't burn.",
      2:"Cook and drain the noodles. Let hot oil settle off the heat before stirring in soy sauces and sugar. Toss through the noodles with the whites and pile the crispiest greens on top."
    }),
    version(30,"A smaller noodle portion with tofu and steamed bok choy in scallion oil.",{"fresh wheat":165,"neutral":[4,"tsp","Neutral oil"],"light soy":1,"sugar":.75},{
      1:"Use a small skillet so the measured oil coats the bottom. Fry scallion whites and then the greens gently until golden. Lift them out and turn off the heat.",
      2:"Cook and drain the noodles. Steam cubed tofu and split baby bok choy until hot and tender. Off the heat, stir both soy sauces and sugar into the oil. Toss with noodles and tofu, then top with bok choy and crisp scallions."
    },[[240,"g","Extra-firm tofu"],[220,"g","Baby bok choy"]])
  ],
  "yangzhou-fried-rice": [
    version(30,"A banquet-style fried rice with char siu and distinct golden grains.",{"raw shrimp":160,"cooked char siu":150,"eggs":3,"neutral":2.5},{
      2:`Fry carrot, peas, and char siu, then add the chilled rice and spread it across the skillet. Work in batches if crowded. Toss with salt and pepper until rice reaches ${chicken}, then return shrimp and eggs and finish with scallions.`
    }),
    version(25,"Shrimp-forward fried rice with more peas and carrots and less char siu.",{"chilled cooked":330,"raw shrimp":220,"cooked char siu":65,"carrots":115,"frozen peas":125,"neutral":1},{
      2:`Fry the extra vegetables and char siu in a wide skillet until surface moisture evaporates. Add rice, salt, and pepper, toss until the rice reaches ${chicken}, then return shrimp and eggs and finish with scallions.`
    })
  ],
  "sichuan-mapo-tofu": [
    version(35,"A stronger doubanjiang base and freshly ground Sichuan pepper on top.",{"ground pork":200,"doubanjiang":2,"fermented black":2.5,"sichuan peppercorns":1.5,"neutral":1.5},{
      0:"Toast the peppercorns briefly and grind fine. Reserve some for serving. Warm the cubed tofu in simmering water for 2–3 minutes, then drain.",
      2:"Simmer tofu gently in most of the stock until it takes on the sauce. Stir cornstarch into the remaining cold stock, add a little at a time, and finish with the freshly ground peppercorn and scallions."
    }),
    version(30,"Extra tofu and lean turkey with a lighter fermented-bean sauce.",{"soft tofu":[550,"g","Medium-firm tofu"],"ground pork":[195,"g","Lean ground turkey"],"doubanjiang":1,"neutral":[2,"tsp","Neutral oil"]},{
      1:`Brown turkey in the oil until it reaches ${chicken}. Lower the heat, then fry the chopped doubanjiang, black beans, garlic, and ginger until fragrant.`
    })
  ],
  "xinjiang-cumin-lamb": [
    version(40,"A smoky skillet version with a bolder toasted cumin and chile finish.",{"cumin seeds":2,"dried chile":1.5,"neutral":2.5,"cilantro":24},{
      2:"Fry onion and garlic, then sizzle most of the crushed cumin and chile until aromatic. Return the rested lamb, toss briefly, and finish with the reserved cumin and cilantro."
    }),
    version(35,"Trimmed lamb leg with more onion, bell pepper, and less oil.",{"boneless lamb":450,"yellow onion":185,"neutral":1},{
      1:`Trim visible fat from the lamb before slicing. Sear it in small batches in most of the oil. Check thick pieces reach ${fish} and rest for 3 minutes.`,
      2:"Fry onion and sliced pepper in remaining oil until crisp-tender, then add garlic, cumin, and chile. Return the rested lamb, toss briefly, and finish with cilantro."
    },[[220,"g","Red bell pepper"]])
  ],
  "cantonese-ginger-scallion-fish": [
    version(25,"Sea bass with shredded ginger, scallion curls, and a sizzling oil finish.",{"skinless cod":[390,"g","Skinless sea bass fillets"],"fresh ginger":35,"scallions":4,"neutral":2},{
      2:"Warm soy, water, and sugar and pour around the fish. Pile fine scallion and ginger slivers on top. Heat the measured oil until shimmering, then spoon it carefully over the aromatics so they sizzle."
    }),
    version(25,"Lean steamed cod over bok choy with a smaller pour of hot oil.",{"skinless cod":[420,"g","Skinless cod fillets"],"light soy":1,"water":3,"neutral":[2,"tsp","Neutral oil"]},{
      1:`Steam cod over simmering water until the thickest part reaches ${fish}. Tip off excess liquid. Steam the split bok choy separately until crisp-tender.`,
      2:"Serve the cod over bok choy. Warm soy, water, and sugar and pour around it. Scatter remaining ginger and scallions over the fish, then carefully spoon the small measure of hot oil over them."
    },[[240,"g","Baby bok choy"]])
  ],
  "cantonese-chicken-claypot": [
    version(70,"More lap cheong and shiitake with a crisp claypot rice crust.",{"lap cheong":120,"dried shiitake":28,"oyster sauce":1.5,"neutral":1.5},{
      3:"Once the rice is tender, keep the pot over medium heat for 2–3 minutes. Rotate it if the burner heats unevenly. Rest covered for 5 minutes, then scrape up the toasted bottom when serving with scallions."
    }),
    version(65,"Chicken breast, more shiitake, and less sausage in a smaller rice batch.",{"jasmine rice":250,"water":300,"chicken thighs":[460,"g","Chicken breast, boneless and skinless"],"lap cheong":40,"dried shiitake":30,"neutral":[2,"tsp","Neutral oil"]},{
      2:`Cover, reduce the heat to low and cook until the rice is tender. Check the chicken reaches ${chicken} and the sausage is cooked as directed. If the chicken needs more time, add a splash of water and cover again.`
    })
  ],
  "hong-kong-baked-pork-chop-rice": [
    version(60,"A cha chaan teng-style gratin with thicker tomato sauce and a browned cheese top.",{"canned crushed":460,"shredded mozzarella":130,"tomato paste":2.5},{
      3:"Lay the rested chops on the rice, coat with thick tomato sauce, and scatter mozzarella over the top. Bake until the cheese bubbles, then broil briefly, watching closely, until lightly browned."
    }),
    version(55,"Trimmed pork loin, a rice-and-cauliflower base, and a lighter cheese topping.",{"boneless pork":[560,"g","Boneless center-cut pork chops, visible fat trimmed"],"chilled cooked":320,"shredded mozzarella":55,"neutral":1.25},{
      1:`Scramble eggs until set in the remaining oil. Sauté the riced cauliflower until its moisture cooks off, then add chilled rice and stir-fry until it reaches ${chicken}. Spread the rice and cauliflower mix in the baking dish.`
    },[[260,"g","Riced cauliflower"]])
  ],
  "hong-kong-egg-tarts": [
    version(95,"A buttery pastry shell with silky, fine-strained milk custard.",{"unsalted butter":110,"powdered sugar":40,"evaporated milk":100,"hot water":105},{
      1:"Dissolve the granulated sugar in hot water and let cool. Whisk in eggs, evaporated milk, and vanilla without making foam, then strain twice for a smooth custard."
    }),
    version(85,"A less sweet egg tart with a thinner shell and a more egg-forward custard.",{"all-purpose":145,"unsalted butter":80,"powdered sugar":25,"eggs":4,"sugar":42,"hot water":105,"evaporated milk":90},{
      0:"Cream butter and powdered sugar. Beat in one-quarter of the whisked eggs, then mix in flour just until a dough forms. Chill 20 minutes, then press the dough in a thin, even layer into the same number of tart tins.",
      1:"Dissolve the measured granulated sugar in hot water and cool it. Whisk in the remaining eggs, evaporated milk, and vanilla, then strain through a fine sieve."
    })
  ],
  "parmesan-polenta-mushroom-ragu": [
    version(55,"Extra-creamy Parmesan polenta and mushrooms browned in small batches.",{"unsalted butter":45,"grated parmesan":80,"mixed cremini":600,"dry red wine":110},{
      3:"Off the heat, whisk the butter and most of the Parmesan into the hot polenta. Spoon the ragù over it, reserving a few well-browned mushrooms for the top. Finish with the remaining cheese."
    }),
    version(50,"A smaller base of polenta with more mushrooms and white beans.",{"medium-grind":135,"water":670,"fine salt":.75,"mixed cremini":575,"extra-virgin":1,"unsalted butter":10,"grated parmesan":40},{
      2:"Deglaze the skillet with wine. Add browned mushrooms, drained beans, stock, thyme, and remaining salt. Reduce until the ragù coats a spoon and the beans are heated through."
    },[[270,"g","Cooked cannellini beans, drained"]])
  ],
  "crispy-polenta-sausage-rapini": [
    version(40,"Crunchy, deeply golden polenta with fennel sausage and extra Parmesan.",{"cooked tube":560,"raw italian":430,"extra-virgin":3,"grated parmesan":45},{
      1:"Heat half the oil and brown polenta in batches until each side forms a crust. Rest pieces on a rack and shave some Parmesan over while hot.",
      3:"Sauté garlic and chile flakes in the remaining oil, then toss in the broccoli rabe and browned sausage. Finish with lemon and spoon over the crisp polenta and remaining Parmesan."
    }),
    version(35,"Lean turkey sausage, additional greens, and a smaller portion of polenta.",{"cooked tube":360,"raw italian":[390,"g","Raw Italian turkey sausage"],"broccoli rabe":500,"extra-virgin":1,"grated parmesan":20},{
      2:`Brown the turkey sausage in a nonstick skillet, breaking it up and checking it reaches ${chicken}. Transfer to a plate before finishing the greens.`
    })
  ],
  "pasta-alla-norma": [
    version(50,"Skillet-fried eggplant and a generous ricotta salata finish.",{"globe eggplant":680,"extra-virgin":5,"ricotta salata":90},{
      0:"Dice the eggplant, season with some salt, and pat dry. Use most of the oil to fry it in uncrowded batches over medium-high until golden and tender. Drain on a rack."
    }),
    version(45,"Roasted eggplant, white beans, and a smaller portion of whole-wheat rigatoni.",{"globe eggplant":700,"extra-virgin":1.5,"dry rigatoni":[240,"g","Dry whole-wheat rigatoni"],"ricotta salata":35},{
      2:"Cook the whole-wheat pasta until al dente. Warm the drained beans in the tomato sauce. Toss the drained pasta and most of the eggplant with the sauce and a splash of reserved pasta water."
    },[[260,"g","Cooked cannellini beans, drained"]])
  ],
  "lemon-chicken-piccata": [
    version(35,"Golden cutlets with a more concentrated wine, lemon, and butter sauce.",{"unsalted chicken stock":150,"unsalted butter":50,"capers":3},{
      2:"Deglaze the skillet with wine and reduce by about half. Add stock, lemon, and capers and simmer until lightly syrupy. Remove from the heat and whisk in cold butter a few pieces at a time."
    },[[60,"mL","Dry white wine"]]),
    version(30,"Seared chicken with a lighter lemon-caper sauce and extra broccoli.",{"chicken breast":650,"all-purpose":20,"extra-virgin":1,"unsalted butter":12},{
      3:"Steam the broccoli until crisp-tender. Return the chicken to coat with the sauce, then serve over broccoli with the chopped parsley."
    },[[400,"g","Broccoli florets"]])
  ],
  "tuscan-ribollita": [
    version(70,"A thick twice-simmered soup finished with olive oil and crunchy bread.",{"extra-virgin":3,"day-old":155},{
      2:"Tear most of the bread into the soup, rest off heat for 10 minutes, and bring it back to a simmer. Toast the remaining bread in a little of the measured olive oil until crisp.",
      3:"Ladle into bowls and finish with toasted bread and the remaining olive oil."
    }),
    version(60,"More cannellini and kale, with enough bread to thicken each bowl.",{"extra-virgin":1,"cooked cannellini":650,"tuscan kale":300,"day-old":70,"unsalted vegetable stock":800},{
      1:"Mash a generous ladle of beans into the stock for body. Simmer with the whole beans and chopped kale until tender, adding the kale in handfuls if needed."
    })
  ],
  "tagliatelle-bolognese": [
    version(195,"A deeply browned beef and pancetta ragù with fresh tagliatelle.",{"ground beef":400,"pancetta":120,"whole milk":140,"dry tagliatelle":[430,"g","Fresh tagliatelle"],"grated parmesan":50},{
      2:"Simmer the meat sauce for at least 2½ hours, adding stock a little at a time so it stays moist. Finish with the milk near the end and reduce until thick.",
      3:"Boil the fresh tagliatelle just until tender. Toss vigorously with the ragù and a splash of cooking water, then finish with Parmesan."
    }),
    version(165,"Lean beef, extra mushrooms, and a smaller portion of pasta.",{"ground beef":[425,"g","Lean ground beef"],"pancetta":45,"dry tagliatelle":240,"grated parmesan":25},{
      1:`Brown the lean beef and minced mushrooms in the pot until released moisture evaporates and the beef reaches ${ground}. Add tomato paste, then wine, and reduce before adding the passata.`
    },[[200,"g","Cremini mushrooms"]])
  ],
  "benu-lobster-soup-dumplings": [
    version(215,"Lobster-forward dumplings with a little more soup and a ginger-vinegar dip.",{"unsalted seafood stock":165,"unflavored":6,"raw lobster":215,"raw shrimp":80,"chinkiang":3},{
      3:`Steam with space between dumplings until the filling is opaque and reaches ${fish}. Rest each dumpling briefly on a spoon, then serve with black vinegar and thin ginger slivers.`
    },[[8,"g","Fresh ginger for the dip"]]),
    version(200,"A shrimp-forward filling with a lighter sesame finish.",{"raw lobster":130,"raw shrimp":150,"toasted sesame":.25},{
      1:"Knead the flour and warm water into a smooth dough and rest it covered for 30 minutes. Mince most of the shrimp until sticky. Mix with diced lobster, the remaining chopped shrimp, soy, ginger, and sesame oil. Fold in the cold stock cubes and refrigerate until wrapping."
    })
  ],
  "state-bird-duck-gyoza": [
    version(55,"Dark sesame dumplings with a crisp underside and a more aromatic tomato ponzu.",{"black sesame":1.5,"neutral oil":1.5,"ripe tomatoes":190,"yuzu juice":1.5},{
      3:"Grate the tomato, then drain it in a fine sieve for a few minutes. Stir the pulp with yuzu, vinegar, and the remaining soy. Finish the dumplings with the reserved sesame and serve with the dip."
    }),
    version(50,"Duck and lean chicken dumplings with extra cabbage and a thinner oil coat.",{"ground duck":170,"napa cabbage":145,"neutral oil":[2,"tsp","Neutral oil"]},{
      0:"Finely mince the cabbage and squeeze it very dry. Mix the duck and chicken with the cabbage, scallions, ginger, most of the sesame, and half the soy. Keep the filling in the refrigerator until you wrap it.",
      2:`Brush the oil into a nonstick skillet, brown the dumpling bottoms, then add the water and cover. Steam until the centers reach ${chicken}. Uncover and let the bottoms re-crisp.`
    },[[150,"g","Lean ground chicken"]])
  ],
  "state-bird-yuba-amatriciana": [
    version(50,"Chanterelles and rendered guanciale in a more concentrated tomato sauce.",{"pancetta":[125,"g","Guanciale"],"mixed mushrooms":[340,"g","Chanterelle mushrooms"],"grated pecorino":55},{
      1:"Dice and render the guanciale until crisp. Set it aside and sear the cleaned chanterelles in batches in the drippings and oil.",
      2:"Sizzle sliced garlic and chile flakes briefly. Add the tomatoes and reduce until thickened. Simmer the ribbons in the sauce with half the guanciale until hot and tender.",
      3:"Finish the sauced yuba with pecorino, crisp reserved guanciale, and parsley."
    }),
    version(45,"Mushroom-heavy yuba with less pancetta and cannellini beans.",{"pancetta":45,"mixed mushrooms":420,"grated pecorino":25},{
      2:"Sizzle garlic and chile briefly, then add the tomatoes and drained beans. Simmer until thickened. Add the yuba and cooked pancetta and cook gently until everything is hot."
    },[[230,"g","Cooked cannellini beans, drained"]])
  ],
  "mister-jius-maitake-tofu": [
    version(40,"Deeply seared maitake, golden garlic, and more fragrant peppercorn oil.",{"maitake":310,"neutral oil":3,"garlic":5,"green sichuan":.75},{
      2:"Toast and crush the peppercorns. Fry sliced garlic and scallion whites in the remaining oil until golden. Reserve a little fragrant oil for serving before adding stock, soy, and the beans. Simmer until hot.",
      3:"Plate the tofu on warm plates with the beans and seared maitake. Spoon the freshly made garlic-scallion oil over it and finish with ground peppercorns and scallion greens."
    }),
    version(35,"More tofu, beans, and mushrooms with just enough oil to brown the maitake.",{"silken tofu":700,"maitake":290,"cooked cranberry":310,"neutral oil":1.25,"light soy sauce":[2,"tsp","Light soy sauce"]},{
      2:"Toast and crush the peppercorns. Warm garlic and scallion whites briefly in the remaining oil. Simmer with the stock, soy, and beans. Lightly mash a spoonful of the beans to thicken the broth."
    })
  ],
  "singlethread-miso-black-cod": [
    version(45,"Silky black cod with a cream-enriched white miso broth and heavily charred leeks.",{"leeks":310,"white miso":50,"neutral oil":1.5},{
      2:`Transfer the fish when the center reaches ${fish}. Add cream to the broth and warm it gently until it returns to a simmer. Take it off heat and whisk in the miso.`
    },[[65,"mL","Heavy cream"]]),
    version(40,"Leaner steamed cod with snap peas, bok choy, and a lighter miso broth.",{"black cod":[650,"g","Cod fillets"],"sugar snap":270,"white miso":30,"neutral oil":[2,"tsp","Neutral oil"],"fine salt":.25},{
      1:`Simmer dashi and leeks. Season the fish, cover, and steam. Add split baby bok choy and snap peas near the end. Remove the fish when it reaches ${fish}.`,
      2:"Whisk miso with a little hot broth in a bowl, then stir it back into the skillet off heat.",
      3:"Divide the leeks, bok choy, peas, and fish among shallow bowls. Finish with the broth and sliced scallions."
    },[[270,"g","Baby bok choy"]])
  ],
  "maido-nikkei-short-ribs": [
    version(220,"A highly reduced sake-soy glaze with a lively ají amarillo finish.",{"boneless beef short ribs":1000,"sake":145,"mirin":4,"ají amarillo":1.5,"scallions":120},{
      1:"Deglaze with sake, then add mirin, soy, and stock before returning the ribs. Braise covered until fork-tender. Lift out the meat, skim and strain the braise, and reduce until glossy before coating the ribs.",
      3:"Brush the hot ribs with the reduced glaze, serve over scallion rice, and spoon the ají-lime sauce around the plate."
    }),
    version(205,"Trimmed beef, less rice, and a bigger serving of peppers and peas.",{"boneless beef short ribs":[680,"g","Boneless beef chuck, visible fat trimmed"],"neutral oil":1.25,"soy sauce":2,"chilled cooked rice":255},{
      0:"Heat the oven to 325°F / 165°C. Pat the trimmed beef dry and sear it in about half the oil. Transfer to a plate, then soften diced onion and stir in minced garlic and ginger.",
      2:`Stir-fry sliced peppers and peas in the remaining oil until crisp-tender. Add the chilled rice and scallions and heat until the rice reaches ${chicken}. Whisk lime juice and ají amarillo together with a spoonful of the braising liquid.`,
      3:"Serve the beef with vegetable fried rice and spoon the ají-lime sauce over the top."
    },[[180,"g","Red bell pepper"],[140,"g","Frozen peas"]])
  ]
};

export function recipeVersion(recipe, kind, baseItems) {
  if (kind === "original") return recipe;
  const selected = recipeVersions[recipe.id]?.[kind === "restaurant" ? 0 : 1];
  if (!selected) return recipe;
  const {time,description,amounts,steps,additions} = selected;
  const displayItems = baseItems.flatMap(([amount,unit,label]) => {
    const key = Object.keys(amounts).find(prefix => label.toLowerCase().startsWith(prefix));
    const change = key === undefined ? amount : amounts[key];
    if (change === 0) return [];
    return [Array.isArray(change) ? change : [change,unit,label]];
  }).concat(additions);
  return {...recipe,time,active:null,desc:description,displayItems,
    steps:[...recipe.steps.map((step,index) => steps[index] ?? step), ...(steps[recipe.steps.length] ? [steps[recipe.steps.length]] : [])]};
}
