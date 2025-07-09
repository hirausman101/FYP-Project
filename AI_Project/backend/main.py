

exercise_rules = [
      {
        "if": {"gender": "male", "age_min": 21, "symptom": "constipation"},
        "then": [
            "Core strengthening (planks, bridges)",
            "Gentle yoga or stretching",
            "10–15 min walking after meals",
            "Hydration reminders",
            "Avoid high-strain intervals"
        ]
    },
    {
        "if": {"gender": "male", "age_min": 21, "symptom": "fatigue"},
        "then": [
            "Light treadmill walking",
            "Seated cycling",
            "Gentle stretching",
            "Short walks with rest breaks",
            "Avoid high-strain intervals"
        ]
    },
    {
        "if": {"gender": "male", "age_min": 21, "symptom": "tremors"},
        "then": [
            "Ball exercises for coordination",
            "Light weightlifting (under supervision)",
            "Tai Chi or yoga",
            "Low-impact cardio",
            "Avoid high-strain intervals"
        ]
    },
    {
        "if": {"gender": "male", "age_min": 21, "symptom": "sleep issues"},
        "then": [
            "Evening walks",
            "Bedtime stretching",
            "Breathing exercises",
            "Avoid high-strain late workouts"
        ]
    },
    {
        "if": {"gender": "male", "age_min": 21, "symptom": "depression"},
        "then": [
            "Dance therapy",
            "Group fitness",
            "Outdoor walks",
            "Gentle stretching",
            "Avoid high-strain"
        ]
    },

{
    "if": {"gender": "male", "age_min": 65, "symptom": "constipation"},
    "then": [
        "Chair yoga or gentle stretching",
        "Short walks after meals (5–10 min)",
        "Seated core exercises (e.g., pelvic tilts)",
        "Hydration reminders",
        "Avoid high-strain or breath-holding"
    ]
},
{
    "if": {"gender": "male", "age_min": 65, "symptom": "fatigue"},
    "then": [
        "Seated leg lifts",
        "Slow indoor cycling (recumbent)",
        "Gentle paced walking with rest breaks",
        "Simple stretching routines",
        "Avoid long durations or high intensity"
    ]
},
{
    "if": {"gender": "male", "age_min": 65, "symptom": "tremors"},
    "then": [
        "Tai Chi (slow, controlled movements)",
        "Ball passing while seated",
        "Balance-focused tasks with support",
        "Gentle hand and arm exercises",
        "Avoid high exertion or unstable standing"
    ]
},
{
    "if": {"gender": "male", "age_min": 65, "symptom": "sleep issues"},
    "then": [
        "Evening light walking indoors",
        "Gentle bedtime stretching",
        "Mindful breathing (5 mins)",
        "Avoid exercising too close to bedtime"
    ]
},
{
    "if": {"gender": "male", "age_min": 65, "symptom": "depression"},
    "then": [
        "Group chair aerobics",
        "Short outdoor walks with caregiver",
        "Safe dance therapy (seated/standing)",
        "Music-based movement",
        "Avoid total inactivity"
    ]
},

{
    "if": {"gender": "female", "age_min": 65, "symptom": "constipation"},
    "then": [
        "Gentle yoga (with support)",
        "Seated core engagement",
        "Post-meal slow walks (10 min)",
        "Avoid high strain",
        "Hydration reminder"
    ]
},
{
    "if": {"gender": "female", "age_min": 65, "symptom": "fatigue"},
    "then": [
        "Chair-based aerobic moves",
        "Simple stretches",
        "Short walking routines (with breaks)",
        "Avoid long exertion"
    ]
},
{
    "if": {"gender": "female", "age_min": 65, "symptom": "tremors"},
    "then": [
        "Tai Chi for seniors",
        "Balance with support rail",
        "Chair-based coordination tasks",
        "No unstable standing"
    ]
},
{
    "if": {"gender": "female", "age_min": 65, "symptom": " issues"},
    "then": [
        "Evening chair yoga",
        "Deep breathing in bed",
        "Stretch routine before bedtime",
        "No late-night movement bursts"
    ]
},
{
    "if": {"gender": "female", "age_min": 65, "symptom": "depression"},
    "then": [
        "Group walking programs",
        "Music-based movement (slow)",
        "Chair dancing",
        "Avoid total inactivity"
    ]
},

{
        "if": {"gender": "female", "age_min": 21, "symptom": "constipation"},
        "then": [
            "Yoga with core focus",
            "Post-meal walking (15 min)",
            "Gentle abdominal exercises",
            "Avoid high strain",
            "Stay hydrated before/after"
        ]
    },
    {
        "if": {"gender": "female", "age_min": 21, "symptom": "fatigue"},
        "then": [
            "Seated leg lifts",
            "Stretching in bed or chair",
            "Light aerobic dance (5–10 mins)",
            "Low-impact walking synced with meals"
        ]
    },
    {
        "if": {"gender": "female", "age_min": 21, "symptom": "tremors"},
        "then": [
            "Tai Chi",
            "Balance ball routines",
            "Seated coordination drills",
            "Avoid instability without support"
        ]
    },
    {
        "if": {"gender": "female", "age_min": 21, "symptom": "sleep issues"},
        "then": [
            "Evening yoga",
            "Breathing practices (5 mins)",
            "Avoid cardio within 2 hours of sleep",
            "Stretching routine with music"
        ]
    },
    {
        "if": {"gender": "female", "age_min": 21, "symptom": "depression"},
        "then": [
            "Dance therapy (Zumba lite)",
            "Outdoor group walks",
            "Stretching to music",
            "Avoid strenuous solo workouts"
        ]
    },


  {
    "if": {"gender": "male", "age_min": 21, "symptom": "constipation", "disease": "diabetes"},
    "then": ["Core strengthening (planks, bridges)", "10–15 min walking after meals", "Avoid high-strain intervals", "Low-impact cardio", "Sync with insulin schedule"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "constipation", "disease": "hypertension"},
    "then": ["Core strengthening (planks, bridges)", "10–15 min walking after meals", "Avoid exertion if heart rate >70%", "Chair yoga", "Cool-down stretches"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "constipation", "disease": "heart_disease"},
    "then": ["Core strengthening (planks, bridges)", "10–15 min walking after meals", "Doctor-approved exercise only", "Moderate-paced walking", "Stretching in intervals"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "fatigue", "disease": "diabetes"},
    "then": ["Light treadmill walking", "Seated cycling", "Avoid high-strain intervals", "Sync exercise with meal and insulin schedule"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "fatigue", "disease": "hypertension"},
    "then": ["Light treadmill walking", "Seated cycling", "Avoid exertion >70% max HR", "Breathing techniques", "Chair yoga"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "fatigue", "disease": "heart_disease"},
    "then": ["Light treadmill walking", "Seated tai chi", "Doctor-approved gentle workouts", "Avoid strength straining"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "tremors", "disease": "diabetes"},
    "then": ["Ball exercises for coordination", "Light weightlifting (under supervision)", "Avoid high-strain intervals", "Low-impact cardio"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "tremors", "disease": "hypertension"},
    "then": ["Ball exercises for coordination", "Light weightlifting (under supervision)", "Avoid intense exertion", "Monitor heart rate"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "tremors", "disease": "heart_disease"},
    "then": ["Ball exercises for coordination", "Light weightlifting (under supervision)", "Doctor-approved gentle workouts"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "sleep issues", "disease": "diabetes"},
    "then": ["Evening walks", "Bedtime stretching", "Avoid high-strain late workouts"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "sleep issues", "disease": "hypertension"},
    "then": ["Evening walks", "Breathing exercises", "Avoid intense exertion before bed"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "sleep issues", "disease": "heart_disease"},
    "then": ["Evening walks", "Stretching in intervals", "Doctor-approved evening relaxation"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "depression", "disease": "diabetes"},
    "then": ["Dance therapy", "Group fitness", "Avoid high-strain", "Sync with insulin schedule"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "depression", "disease": "hypertension"},
    "then": ["Dance therapy", "Group fitness", "Monitor heart rate", "Avoid intense sessions"]
  },
  {
    "if": {"gender": "male", "age_min": 21, "symptom": "depression", "disease": "heart_disease"},
    "then": ["Walk-and-talk sessions", "Gardening", "Doctor-approved group walks"]
  },

  {
    "if": {"gender": "male", "age_min": 65, "symptom": "constipation", "disease": "diabetes"},
    "then": ["Chair yoga", "Gentle core exercises (e.g., seated pelvic tilts)", "Short walks after meals", "Avoid high-strain intervals", "Monitor blood sugar levels pre/post activity"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "constipation", "disease": "hypertension"},
    "then": ["Chair yoga", "Gentle stretching", "Post-meal slow walks", "Avoid exertion >60% max HR", "Breathing-focused movements"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "constipation", "disease": "heart_disease"},
    "then": ["Chair-based abdominal engagement", "10-minute doctor-approved walking routine", "Avoid strain and breath-holding", "Hydration-focused reminders"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "fatigue", "disease": "diabetes"},
    "then": ["Seated leg lifts", "Slow indoor cycling (recumbent)", "Sync with insulin and meals", "Gentle paced walking", "Avoid long durations"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "fatigue", "disease": "hypertension"},
    "then": ["Seated stretching", "Short walking sessions (5–10 min)", "Avoid intense aerobic activity", "Use chair support for balance"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "fatigue", "disease": "heart_disease"},
    "then": ["Short bouts of movement (3–5 min)", "Rest-focused pacing", "Supervised breathing and stretching", "Doctor clearance before walking"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "tremors", "disease": "diabetes"},
    "then": ["Tai Chi (slow, controlled)", "Ball passing while seated", "Balance-focused tasks with support", "Avoid high exertion"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "tremors", "disease": "hypertension"},
    "then": ["Chair-based coordination tasks", "Balance with wall support", "Breathing-coordinated arm circles", "Avoid sudden movements"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "tremors", "disease": "heart_disease"},
    "then": ["Slow standing balance exercises (with assistance)", "Seated Tai Chi", "Coordination drills approved by physician"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "sleep issues", "disease": "diabetes"},
    "then": ["Evening light walking indoors", "Gentle bedtime stretching", "Avoid exercising too close to bedtime", "Mindful breathing (5 mins)"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "sleep issues", "disease": "hypertension"},
    "then": ["Slow-paced chair yoga", "Breathing exercises before bed", "Avoid late caffeine or physical stress"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "sleep issues", "disease": "heart_disease"},
    "then": ["Relaxation stretching before bed", "Doctor-approved light walk (early evening)", "Calm music with deep breathing"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "depression", "disease": "diabetes"},
    "then": ["Group chair aerobics", "Short outdoor walks with caregiver", "Safe dance therapy (seated/standing)", "Avoid blood sugar dips post-activity"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "depression", "disease": "hypertension"},
    "then": ["Morning sun walks", "Community-led gentle exercise groups", "Avoid emotionally or physically draining workouts"]
  },
  {
    "if": {"gender": "male", "age_min": 65, "symptom": "depression", "disease": "heart_disease"},
    "then": ["Group walking therapy (low pace)", "Gardening activities", "Social movement groups with supervision"]
  },

  {
    "if": {"gender": "female", "age_min": 21, "symptom": "constipation", "disease": "diabetes"},
    "then": ["Yoga with core focus", "Post-meal walking (15 min)", "Gentle abdominal exercises", "Avoid high strain", "Stay hydrated before/after"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "constipation", "disease": "hypertension"},
    "then": ["Gentle yoga", "Light post-meal walking", "Avoid isometric strain", "Include breathing routines"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "constipation", "disease": "heart_disease"},
    "then": ["Doctor-approved yoga (slow flow)", "Seated abdominal bracing", "Avoid overexertion or pressure on chest"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "fatigue", "disease": "diabetes"},
    "then": ["Seated leg lifts", "Stretching in bed or chair", "Light aerobic dance (5–10 mins)", "Low-impact walking synced with meals"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "fatigue", "disease": "hypertension"},
    "then": ["Slow-paced stretching", "Gentle walking", "Avoid prolonged exertion", "Breath-coordinated movement"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "fatigue", "disease": "heart_disease"},
    "then": ["Supervised walking", "Rest-integrated stretching routines", "Slow chair-based aerobics with doctor approval"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "tremors", "disease": "diabetes"},
    "then": ["Tai Chi", "Balance ball routines", "Seated coordination drills", "Avoid instability without support"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "tremors", "disease": "hypertension"},
    "then": ["Gentle balance training", "Slow hand-foot coordination work", "Tai Chi or yoga with breathing"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "tremors", "disease": "heart_disease"},
    "then": ["Doctor-cleared balance exercises", "Support-assisted coordination movements", "Avoid high-energy bursts"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "sleep issues", "disease": "diabetes"},
    "then": ["Evening yoga", "Breathing practices (5 mins)", "Avoid cardio within 2 hours of sleep", "Stretching routine with music"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "sleep issues", "disease": "hypertension"},
    "then": ["Evening meditation + stretching", "Breathwork (e.g., box breathing)", "Avoid caffeine and intense activity late"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "sleep issues", "disease": "heart_disease"},
    "then": ["Calm yoga (evening)", "Doctor-approved relaxation movement", "Sleep-hygiene supportive routines"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "depression", "disease": "diabetes"},
    "then": ["Dance therapy (Zumba lite)", "Outdoor group walks", "Stretching to music", "Avoid strenuous solo workouts"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "depression", "disease": "hypertension"},
    "then": ["Nature walks", "Group fitness with low exertion", "Gentle dance/movement therapy", "Stretch-yoga combo"]
  },
  {
    "if": {"gender": "female", "age_min": 21, "symptom": "depression", "disease": "heart_disease"},
    "then": ["Doctor-approved movement therapy", "Group walks", "Chair dancing or movement to music", "Avoid emotional/physical overload"]
  },

  {
    "if": {"gender": "female", "age_min": 65, "symptom": "constipation", "disease": "diabetes"},
    "then": ["Gentle yoga (with support)", "Seated core engagement", "Post-meal slow walks (10 min)", "Avoid high strain", "Hydration reminder"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "constipation", "disease": "hypertension"},
    "then": ["Chair-based yoga", "Breathing-enhanced stretching", "Short, frequent walks", "Avoid holding breath or strain"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "constipation", "disease": "heart_disease"},
    "then": ["Doctor-cleared gentle yoga", "Seated or supported abdominal stretches", "No strain, no deep forward folds"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "fatigue", "disease": "diabetes"},
    "then": ["Chair-based aerobic moves", "Simple stretches", "Short walking routines (with breaks)", "Avoid long exertion"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "fatigue", "disease": "hypertension"},
    "then": ["Slow pace walking", "Seated stretches", "Avoid high heart rate rise", "Use of support or walker if needed"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "fatigue", "disease": "heart_disease"},
    "then": ["Only doctor-approved walking", "Chair-based stretches", "Gentle mobility drills with rest intervals"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "tremors", "disease": "diabetes"},
    "then": ["Tai Chi for seniors", "Balance with support rail", "Chair-based coordination tasks", "No unstable standing"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "tremors", "disease": "hypertension"},
    "then": ["Gentle Tai Chi", "Balance board or support-assisted moves", "Breathing coordination while seated"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "tremors", "disease": "heart_disease"},
    "then": ["Physician-approved balance drills", "Support-assisted movements", "Avoid sudden movements or high strain"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "sleep issues", "disease": "diabetes"},
    "then": ["Evening chair yoga", "Deep breathing in bed", "Stretch routine before bedtime", "No late-night movement bursts"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "sleep issues", "disease": "hypertension"},
    "then": ["Light stretches at sunset", "Seated breathwork", "Avoid stimulating exercise post-7pm", "Use of sleep-relax music"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "sleep issues", "disease": "heart_disease"},
    "then": ["Bedside stretching", "Breathing practice (4-7-8 method)", "Only doctor-cleared movements in PM"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "depression", "disease": "diabetes"},
    "then": ["Group walking programs", "Music-based movement (slow)", "Chair dancing", "Avoid total inactivity"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "depression", "disease": "hypertension"},
    "then": ["Low-intensity group walks", "Nature exposure with movement", "Seated rhythmic movement with music"]
  },
  {
    "if": {"gender": "female", "age_min": 65, "symptom": "depression", "disease": "heart_disease"},
    "then": ["Supervised light dancing", "Movement therapy in group", "Walking near greenery", "Strictly avoid exertional spikes"]
  },


]



def recommend_exercise_by_profile(age, gender, symptoms, diseases):
    results = {}
    for symptom in symptoms:
        found = False
        if diseases:
            for disease in diseases:
                for rule in exercise_rules:
                    cond = rule["if"]
                    if (
                        cond.get("gender") == gender
                        and age >= cond.get("age_min", 0)
                        and cond.get("symptom") == symptom
                        and cond.get("disease") == disease
                    ):
                        results[symptom] = rule["then"]
                        found = True
                        break
                if found:
                    break
        else:
            # No disease: match rules that do NOT require a disease
            for rule in exercise_rules:
                cond = rule["if"]
                if (
                    cond.get("gender") == gender
                    and age >= cond.get("age_min", 0)
                    and cond.get("symptom") == symptom
                    and "disease" not in cond
                ):
                    results[symptom] = rule["then"]
                    found = True
                    break
        if not found:
            results[symptom] = ["No specific exercise recommendation for this profile."]
    return results


food_rules = [

  {"if": {"age_min": 21, "symptom": "constipation", "meal": "breakfast"}, "then": ["oats", "berries", "chia seeds", "vegetables"]},
  {"if": {"age_min": 21, "symptom": "constipation", "meal": "lunch"}, "then": ["spinach", "quinoa", "beans"]},
  {"if": {"age_min": 21, "symptom": "constipation", "meal": "dinner"}, "then": ["low-sodium soup", "vegetables", "brown rice"]},
  {"if": {"age_min": 65, "symptom": "constipation", "meal": "breakfast"}, "then": ["prunes", "fiber-rich cereals", "chia seeds"]},
  {"if": {"age_min": 65, "symptom": "constipation", "meal": "lunch"}, "then": ["lentils", "leafy greens", "brown rice"]},
  {"if": {"age_min": 65, "symptom": "constipation", "meal": "dinner"}, "then": ["vegetable broth", "flaxseeds", "whole grains"]},

  {"if": {"age_min": 21, "symptom": "tremors", "meal": "breakfast"}, "then": ["banana", "walnuts", "oats"]},
  {"if": {"age_min": 21, "symptom": "tremors", "meal": "lunch"}, "then": ["spinach", "quinoa", "salmon"]},
  {"if": {"age_min": 21, "symptom": "tremors", "meal": "dinner"}, "then": ["vegetables", "mackerel", "pumpkin seeds"]},
  {"if": {"age_min": 65, "symptom": "tremors", "meal": "breakfast"}, "then": ["banana", "walnuts", "chia seeds"]},
  {"if": {"age_min": 65, "symptom": "tremors", "meal": "lunch"}, "then": ["spinach", "salmon", "sweet potatoes"]},
  {"if": {"age_min": 65, "symptom": "tremors", "meal": "dinner"}, "then": ["leafy greens", "pumpkin seeds", "oily fish"]},

  {"if": {"age_min": 21, "symptom": "sleep issues", "meal": "breakfast"}, "then": ["kiwi", "warm milk", "banana"]},
  {"if": {"age_min": 21, "symptom": "sleep issues", "meal": "lunch"}, "then": ["greens", "sweet potatoes", "quinoa"]},
  {"if": {"age_min": 21, "symptom": "sleep issues", "meal": "dinner"}, "then": ["chamomile tea", "lettuce", "yogurt"]},
  {"if": {"age_min": 65, "symptom": "sleep issues", "meal": "breakfast"}, "then": ["kiwi", "warm herbal tea", "banana"]},
  {"if": {"age_min": 65, "symptom": "sleep issues", "meal": "lunch"}, "then": ["green leafy vegetables", "sweet potatoes", "quinoa"]},
  {"if": {"age_min": 65, "symptom": "sleep issues", "meal": "dinner"}, "then": ["chamomile tea", "lettuce", "tart cherry juice"]},

{"if": {"age_min": 65, "symptom": "fatigue", "meal": "breakfast"}, "then": ["iron-rich foods", "spinach", "nuts", "legumes"]},
{"if": {"age_min": 65, "symptom": "fatigue", "meal": "lunch"}, "then": ["berries", "spinach"]},
{"if": {"age_min": 65, "symptom": "fatigue", "meal": "dinner"}, "then": ["spinach", "oats"]},

{"if": {"age_min": 21, "symptom": "fatigue", "meal": "breakfast"}, "then": ["spinach", "oats", "berries", "nuts"]},
{"if": {"age_min": 21, "symptom": "fatigue", "meal": "lunch"}, "then": ["quinoa", "chicken breast", "leafy greens"]},
{"if": {"age_min": 21, "symptom": "fatigue", "meal": "dinner"}, "then": ["salmon", "sweet potatoes", "broccoli"]},

  {"if": {"age_min": 21, "symptom": "depression", "meal": "breakfast"}, "then": ["dark chocolate", "berries", "oats"]},
  {"if": {"age_min": 21, "symptom": "depression", "meal": "lunch"}, "then": ["spinach", "salmon", "brown rice"]},
  {"if": {"age_min": 21, "symptom": "depression", "meal": "dinner"}, "then": ["vegetables", "sunflower seeds", "herbal teas"]},
  {"if": {"age_min": 65, "symptom": "depression", "meal": "breakfast"}, "then": ["dark chocolate", "banana", "fiber-rich cereals"]},
  {"if": {"age_min": 65, "symptom": "depression", "meal": "lunch"}, "then": ["green leafy vegetables", "oily fish", "quinoa"]},
  {"if": {"age_min": 65, "symptom": "depression", "meal": "dinner"}, "then": ["vegetables", "sunflower seeds", "herbal teas"]},



  {"if": {"age_min": 21, "symptom": "constipation", "disease": "diabetes", "meal": "breakfast"}, "then": ["fruit", "fiber", "natural sugar", "whole grains", "carb", "omega-3", "seed"]},
  {"if": {"age_min": 21, "symptom": "constipation", "disease": "diabetes", "meal": "lunch"}, "then": ["fiber", "protein", "carb", "whole grains", "magnesium", "soy"]},
  {"if": {"age_min": 21, "symptom": "constipation", "disease": "diabetes", "meal": "dinner"}, "then": ["vegetables", "fiber", "fat", "whole grains", "carb"]},

  {"if": {"age_min": 21, "symptom": "constipation", "disease": "hypertension", "meal": "breakfast"}, "then": ["fiber", "whole grains", "omega-3", "berries", "antioxidant", "natural sugar"]},
  {"if": {"age_min": 21, "symptom": "constipation", "disease": "hypertension", "meal": "lunch"}, "then": ["vegetables", "natural sugar", "fiber", "protein", "carb", "whole grains"]},
  {"if": {"age_min": 21, "symptom": "constipation", "disease": "hypertension", "meal": "dinner"}, "then": ["vegetables", "fiber", "fat", "whole grains", "protein", "magnesium"]},

  {"if": {"age_min": 21, "symptom": "constipation", "disease": "heart_disease", "meal": "breakfast"}, "then": ["fruit", "fiber", "whole grains", "carb", "pectin"]},
  {"if": {"age_min": 21, "symptom": "constipation", "disease": "heart_disease", "meal": "lunch"}, "then": ["fiber", "protein", "carb", "whole grains"]},
  {"if": {"age_min": 21, "symptom": "constipation", "disease": "heart_disease", "meal": "dinner"}, "then": ["vegetables", "fiber", "fat", "whole grains", "carb", "protein"]},

  {"if": {"age_min": 21, "symptom": "fatigue", "disease": "diabetes", "meal": "breakfast"}, "then": ["vegetables", "fiber", "protein", "fat", "whole grains", "carb"]},
  {"if": {"age_min": 21, "symptom": "fatigue", "disease": "diabetes", "meal": "lunch"}, "then": ["whole grains", "protein", "fiber", "carb"]},
  {"if": {"age_min": 21, "symptom": "fatigue", "disease": "diabetes", "meal": "dinner"}, "then": ["protein", "lean meat", "vegetables", "fiber"]},

  {"if": {"age_min": 21, "symptom": "fatigue", "disease": "hypertension", "meal": "breakfast"}, "then": ["fruit", "antioxidant", "natural sugar", "whole grains", "fiber", "carb", "potassium"]},
  {"if": {"age_min": 21, "symptom": "fatigue", "disease": "hypertension", "meal": "lunch"}, "then": ["whole grains", "protein", "fiber", "carb"]},
  {"if": {"age_min": 21, "symptom": "fatigue", "disease": "hypertension", "meal": "dinner"}, "then": ["protein", "lean meat", "vegetables", "fiber"]},

  {"if": {"age_min": 21, "symptom": "fatigue", "disease": "heart_disease", "meal": "breakfast"}, "then": ["vegetables", "fiber", "fat", "whole grains", "carb"]},
  {"if": {"age_min": 21, "symptom": "fatigue", "disease": "heart_disease", "meal": "lunch"}, "then": ["whole grains", "protein", "fiber", "carb"]},
  {"if": {"age_min": 21, "symptom": "fatigue", "disease": "heart_disease", "meal": "dinner"}, "then": ["protein", "lean meat", "vegetables", "fiber"]},


  {"if": {"age_min": 21, "symptom": "tremors", "disease": "diabetes", "meal": "breakfast"}, "then": ["whole grains", "fruits", "nuts and seeds"]},
  {"if": {"age_min": 21, "symptom": "tremors", "disease": "diabetes", "meal": "lunch"}, "then": ["lean protein", "leafy greens"]},
  {"if": {"age_min": 21, "symptom": "tremors", "disease": "diabetes", "meal": "dinner"}, "then": ["lean protein", "starchy vegetables"]},
  
  {"if": {"age_min": 21, "symptom": "tremors", "disease": "hypertension", "meal": "breakfast"}, "then": ["leafy greens", "whole grains"]},
  {"if": {"age_min": 21, "symptom": "tremors", "disease": "hypertension", "meal": "lunch"}, "then": ["lean protein", "leafy greens"]},
  {"if": {"age_min": 21, "symptom": "tremors", "disease": "hypertension", "meal": "dinner"}, "then": ["lean protein", "starchy vegetables"]},

  {"if": {"age_min": 21, "symptom": "tremors", "disease": "heart_disease", "meal": "breakfast"}, "then": ["omega-3 rich foods", "nuts and seeds", "healthy fats"]},
  {"if": {"age_min": 21, "symptom": "tremors", "disease": "heart_disease", "meal": "lunch"}, "then": ["lean protein", "leafy greens"]},
  {"if": {"age_min": 21, "symptom": "tremors", "disease": "heart_disease", "meal": "dinner"}, "then": ["lean protein", "starchy vegetables"]},

  {"if": {"age_min": 21, "symptom": "sleep issues", "disease": "diabetes", "meal": "breakfast"}, "then": ["fruits", "nuts and seeds", "whole grains"]},
  {"if": {"age_min": 21, "symptom": "sleep issues", "disease": "diabetes", "meal": "lunch"}, "then": ["lean protein", "leafy greens", "whole grains"]},
  {"if": {"age_min": 21, "symptom": "sleep issues", "disease": "diabetes", "meal": "dinner"}, "then": ["fatty fish", "whole grains", "vegetables"]},

  {"if": {"age_min": 21, "symptom": "sleep issues", "disease": "hypertension", "meal": "breakfast"}, "then": ["fruits", "whole grains", "dairy"]},
  {"if": {"age_min": 21, "symptom": "sleep issues", "disease": "hypertension", "meal": "lunch"}, "then": ["lean protein", "leafy greens", "whole grains"]},
  {"if": {"age_min": 21, "symptom": "sleep issues", "disease": "hypertension", "meal": "dinner"}, "then": ["fatty fish", "whole grains", "vegetables"]},

  {"if": {"age_min": 21, "symptom": "sleep issues", "disease": "heart_disease", "meal": "breakfast"}, "then": ["whole grains", "magnesium-rich foods"]},
  {"if": {"age_min": 21, "symptom": "sleep issues", "disease": "heart_disease", "meal": "lunch"}, "then": ["lean protein", "leafy greens", "whole grains"]},
  {"if": {"age_min": 21, "symptom": "sleep issues", "disease": "heart_disease", "meal": "dinner"}, "then": ["fatty fish", "whole grains", "vegetables"]},

  {"if": {"age_min": 21, "symptom": "depression", "disease": "diabetes", "meal": "breakfast"}, "then": ["fruits", "whole grains", "nuts and seeds"]},
  {"if": {"age_min": 21, "symptom": "depression", "disease": "diabetes", "meal": "lunch"}, "then": ["fatty fish", "nuts and seeds", "legumes", "leafy greens", "whole grains"]},
  {"if": {"age_min": 21, "symptom": "depression", "disease": "diabetes", "meal": "dinner"}, "then": ["lean protein", "starchy vegetables", "vegetables", "plant-based protein", "legumes"]},

  {"if": {"age_min": 21, "symptom": "depression", "disease": "hypertension", "meal": "breakfast"}, "then": ["magnesium-rich foods", "leafy greens"]},
  {"if": {"age_min": 21, "symptom": "depression", "disease": "hypertension", "meal": "lunch"}, "then": ["fatty fish", "nuts and seeds", "legumes", "leafy greens", "whole grains"]},
  {"if": {"age_min": 21, "symptom": "depression", "disease": "hypertension", "meal": "dinner"}, "then": ["lean protein", "starchy vegetables", "vegetables", "plant-based protein", "legumes"]},

  {"if": {"age_min": 21, "symptom": "depression", "disease": "heart_disease", "meal": "breakfast"}, "then": ["fatty fish", "dark chocolate", "nuts and seeds", "greens"]},
  {"if": {"age_min": 21, "symptom": "depression", "disease": "heart_disease", "meal": "lunch"}, "then": ["fatty fish", "nuts and seeds", "legumes", "leafy greens", "whole grains"]},
  {"if": {"age_min": 21, "symptom": "depression", "disease": "heart_disease", "meal": "dinner"}, "then": ["lean protein", "starchy vegetables", "vegetables", "plant-based protein", "legumes"]},


  # Constipation
  {"if": {"age_min": 65, "symptom": "constipation", "disease": "diabetes", "meal": "breakfast"}, "then": ["eggs", "whole grains", "fiber-rich cereals"]},
  {"if": {"age_min": 65, "symptom": "constipation", "disease": "diabetes", "meal": "lunch"}, "then": ["beans", "legumes", "lentils"]},
  {"if": {"age_min": 65, "symptom": "constipation", "disease": "diabetes", "meal": "dinner"}, "then": ["olive oil", "greens", "leafy greens"]},
  {"if": {"age_min": 65, "symptom": "constipation", "disease": "hypertension", "meal": "breakfast"}, "then": ["prunes", "flaxseeds", "oats"]},
  {"if": {"age_min": 65, "symptom": "constipation", "disease": "hypertension", "meal": "lunch"}, "then": ["beets", "legumes", "lentils"]},
  {"if": {"age_min": 65, "symptom": "constipation", "disease": "hypertension", "meal": "dinner"}, "then": ["olive oil", "greens", "leafy greens"]},
  {"if": {"age_min": 65, "symptom": "constipation", "disease": "heart_disease", "meal": "breakfast"}, "then": ["prunes", "vegetables", "fiber-rich foods"]},
  {"if": {"age_min": 65, "symptom": "constipation", "disease": "heart_disease", "meal": "lunch"}, "then": ["beans", "legumes", "lentils"]},
  {"if": {"age_min": 65, "symptom": "constipation", "disease": "heart_disease", "meal": "dinner"}, "then": ["olive oil", "greens", "leafy greens"]},

  # Fatigue
  {"if": {"age_min": 65, "symptom": "fatigue", "disease": "diabetes", "meal": "breakfast"}, "then": ["iron-rich foods", "spinach", "nuts", "legumes"]},
  {"if": {"age_min": 65, "symptom": "fatigue", "disease": "diabetes", "meal": "lunch"}, "then": ["spinach", "spinach"]},
  {"if": {"age_min": 65, "symptom": "fatigue", "disease": "diabetes", "meal": "dinner"}, "then": ["baked chicken", "steamed vegetables"]},
  {"if": {"age_min": 65, "symptom": "fatigue", "disease": "hypertension", "meal": "breakfast"}, "then": ["berries", "beets", "lentils"]},
  {"if": {"age_min": 65, "symptom": "fatigue", "disease": "hypertension", "meal": "lunch"}, "then": ["lentil soup", "quinoa salad"]},
  {"if": {"age_min": 65, "symptom": "fatigue", "disease": "hypertension", "meal": "dinner"}, "then": ["baked chicken", "steamed vegetables"]},
  {"if": {"age_min": 65, "symptom": "fatigue", "disease": "heart_disease", "meal": "breakfast"}, "then": ["leafy greens", "low-sodium soup", "avocados"]},
  {"if": {"age_min": 65, "symptom": "fatigue", "disease": "heart_disease", "meal": "lunch"}, "then": ["lentil soup", "quinoa salad"]},
  {"if": {"age_min": 65, "symptom": "fatigue", "disease": "heart_disease", "meal": "dinner"}, "then": ["baked chicken", "steamed vegetables"]},

  # Tremors
  {"if": {"age_min": 65, "symptom": "tremors", "disease": "diabetes", "meal": "breakfast"}, "then": ["berries", "fish with omega-3", "oats"]},
  {"if": {"age_min": 65, "symptom": "tremors", "disease": "diabetes", "meal": "lunch"}, "then": ["turkey sandwich", "mixed greens salad"]},
  {"if": {"age_min": 65, "symptom": "tremors", "disease": "diabetes", "meal": "dinner"}, "then": ["grilled chicken", "sweet potatoes"]},
  {"if": {"age_min": 65, "symptom": "tremors", "disease": "hypertension", "meal": "breakfast"}, "then": ["leafy greens", "low-sodium foods"]},
  {"if": {"age_min": 65, "symptom": "tremors", "disease": "hypertension", "meal": "lunch"}, "then": ["turkey sandwich", "mixed greens salad"]},
  {"if": {"age_min": 65, "symptom": "tremors", "disease": "hypertension", "meal": "dinner"}, "then": ["grilled chicken", "sweet potatoes"]},
  {"if": {"age_min": 65, "symptom": "tremors", "disease": "heart_disease", "meal": "breakfast"}, "then": ["omega-3 fatty acids", "nuts", "olive oil"]},
  {"if": {"age_min": 65, "symptom": "tremors", "disease": "heart_disease", "meal": "lunch"}, "then": ["turkey sandwich", "mixed greens salad"]},
  {"if": {"age_min": 65, "symptom": "tremors", "disease": "heart_disease", "meal": "dinner"}, "then": ["grilled chicken", "sweet potatoes"]},

  # Sleep Issues
  {"if": {"age_min": 65, "symptom": "sleep issues", "disease": "diabetes", "meal": "breakfast"}, "then": ["cherries", "almonds", "whole grains"]},
  {"if": {"age_min": 65, "symptom": "sleep issues", "disease": "diabetes", "meal": "lunch"}, "then": ["grilled chicken", "leafy greens", "quinoa salad"]},
  {"if": {"age_min": 65, "symptom": "sleep issues", "disease": "diabetes", "meal": "dinner"}, "then": ["steamed salmon", "brown rice", "stuffed bell peppers"]},
  {"if": {"age_min": 65, "symptom": "sleep issues", "disease": "hypertension", "meal": "breakfast"}, "then": ["bananas", "low-salt meals", "warm milk"]},
  {"if": {"age_min": 65, "symptom": "sleep issues", "disease": "hypertension", "meal": "lunch"}, "then": ["grilled chicken", "leafy greens", "quinoa salad"]},
  {"if": {"age_min": 65, "symptom": "sleep issues", "disease": "hypertension", "meal": "dinner"}, "then": ["steamed salmon", "brown rice", "stuffed bell peppers"]},
  {"if": {"age_min": 65, "symptom": "sleep issues", "disease": "heart_disease", "meal": "breakfast"}, "then": ["whole grains", "magnesium-rich foods"]},
  {"if": {"age_min": 65, "symptom": "sleep issues", "disease": "heart_disease", "meal": "lunch"}, "then": ["grilled chicken", "leafy greens", "quinoa salad"]},
  {"if": {"age_min": 65, "symptom": "sleep issues", "disease": "heart_disease", "meal": "dinner"}, "then": ["steamed salmon", "brown rice", "stuffed bell peppers"]},

  # Depression
  {"if": {"age_min": 65, "symptom": "depression", "disease": "diabetes", "meal": "breakfast"}, "then": ["berries", "whole grains", "walnuts"]},
  {"if": {"age_min": 65, "symptom": "depression", "disease": "diabetes", "meal": "lunch"}, "then": ["salmon salad", "walnuts", "lentil soup", "spinach", "chickpea and kale wrap"]},
  {"if": {"age_min": 65, "symptom": "depression", "disease": "diabetes", "meal": "dinner"}, "then": ["grilled turkey", "sweet potatoes", "vegetable stir-fry", "tofu", "black bean and quinoa chili"]},
  {"if": {"age_min": 65, "symptom": "depression", "disease": "hypertension", "meal": "breakfast"}, "then": ["magnesium-rich foods", "leafy greens"]},
  {"if": {"age_min": 65, "symptom": "depression", "disease": "hypertension", "meal": "lunch"}, "then": ["salmon salad", "walnuts", "lentil soup", "spinach", "chickpea and kale wrap"]},
  {"if": {"age_min": 65, "symptom": "depression", "disease": "hypertension", "meal": "dinner"}, "then": ["grilled turkey", "sweet potatoes", "vegetable stir-fry", "tofu", "black bean and quinoa chili"]},
  {"if": {"age_min": 65, "symptom": "depression", "disease": "heart_disease", "meal": "breakfast"}, "then": ["salmon", "dark chocolate", "nuts", "greens"]},
  {"if": {"age_min": 65, "symptom": "depression", "disease": "heart_disease", "meal": "lunch"}, "then": ["salmon salad", "walnuts", "lentil soup", "spinach", "chickpea and kale wrap"]},
  {"if": {"age_min": 65, "symptom": "depression", "disease": "heart_disease", "meal": "dinner"}, "then": ["grilled turkey", "sweet potatoes", "vegetable stir-fry", "tofu", "black bean and quinoa chili"]}
]


restricted_food_rules_disease = [
    {"if": {"disease": "diabetes"}, "then": ["natural sugar", "vegetable", "processed"]},
    {"if": {"disease": "hypertension"}, "then": ["sodium", "salt", "processed", "pickled"]},
    {"if": {"disease": "heart_disease"}, "then": ["saturated fat", "fried", "processed"]},
]

restricted_food_rules_symptom = [
    {"if": {"symptom": "constipation"}, "then": ["processed", "low fiber", "low water"]},
    {"if": {"symptom": "fatigue"}, "then": ["sugar", "low protein", "caffeine"]},
    {"if": {"symptom": "tremors"}, "then": ["caffeine", "sugar", "processed"]},
    {"if": {"symptom": "sleep issues"}, "then": ["caffeine", "sugar", "processed"]},
    {"if": {"symptom": "depression"}, "then": ["sugar", "processed", "low omega-3"]},
]


FOOD_CATEGORIES = [{"if": {"food": "prunes"}, "then": ['fruit', 'fiber', 'natural sugar']},
{"if": {"food": "whole grains"}, "then": ['fiber', 'whole grain', 'carb']},
{"if": {"food": "legumes"}, "then": ['fiber', 'protein', 'carb']},
{"if": {"food": "beans"}, "then": ['fiber', 'protein', 'carb']},
{"if": {"food": "flaxseeds"}, "then": ['fiber', 'omega-3', 'seed']},
{"if": {"food": "oats"}, "then": ['fiber', 'whole grain', 'carb']},
{"if": {"food": "beets"}, "then": ['vegetable', 'natural sugar']},
{"if": {"food": "vegetables"}, "then": ['vegetable', 'fiber']},
{"if": {"food": "fiber-rich foods"}, "then": ['fiber']},
{"if": {"food": "iron-rich foods"}, "then": ['iron', 'protein']},
{"if": {"food": "spinach"}, "then": ['vegetable', 'iron', 'fiber']},
{"if": {"food": "nuts"}, "then": ['protein', 'fat']},
{"if": {"food": "berries"}, "then": ['fruit', 'antioxidant', 'natural sugar']},
{"if": {"food": "lentils"}, "then": ['fiber', 'protein', 'carb']},
{"if": {"food": "leafy greens"}, "then": ['vegetable', 'fiber']},
{"if": {"food": "low-sodium soup"}, "then": ['low sodium', 'soup']},
{"if": {"food": "avocados"}, "then": ['fat', 'fiber']},
{"if": {"food": "fish with omega-3"}, "then": ['fish', 'omega-3', 'protein']},
{"if": {"food": "low-sodium foods"}, "then": ['low sodium']},
{"if": {"food": "omega-3 fatty acids"}, "then": ['omega-3', 'fat']},
{"if": {"food": "olive oil"}, "then": ['fat']},
{"if": {"food": "cherries"}, "then": ['fruit', 'natural sugar']},
{"if": {"food": "almonds"}, "then": ['nut', 'protein', 'fat']},
{"if": {"food": "bananas"}, "then": ['fruit', 'potassium']},
{"if": {"food": "low-salt meals"}, "then": ['low sodium']},
{"if": {"food": "warm milk"}, "then": ['dairy', 'protein']},
{"if": {"food": "magnesium-rich foods"}, "then": ['magnesium']},
{"if": {"food": "walnuts"}, "then": ['nut', 'omega-3', 'fat']},
{"if": {"food": "greens"}, "then": ['vegetable', 'fiber']},
{"if": {"food": "salmon"}, "then": ['fish', 'omega-3', 'protein']},
{"if": {"food": "dark chocolate"}, "then": ['antioxidant', 'sugar']},
{"if": {"food": "fiber-rich cereals"}, "then": ['fiber', 'whole grain', 'carb']},
{"if": {"food": "chia seeds"}, "then": ['fiber', 'omega-3', 'seed']},
{"if": {"food": "protein-rich meals"}, "then": ['protein']},
{"if": {"food": "herbal teas"}, "then": ['herb', 'drink']},
{"if": {"food": "low sugar snacks"}, "then": ['low sugar']},
{"if": {"food": "warm herbal tea"}, "then": ['herb', 'drink']},
{"if": {"food": "potassium-rich fruits"}, "then": ['fruit', 'potassium']},
{"if": {"food": "pumpkin seeds"}, "then": ['seed', 'magnesium']},
{"if": {"food": "green leafy vegetables"}, "then": ['vegetable', 'fiber']},
{"if": {"food": "eggs"}, "then": ['protein', 'choline', 'brain health']},
{"if": {"food": "blueberries"}, "then": ['natural sugar', 'antioxidant', 'brain health']},
{"if": {"food": "turmeric"}, "then": ['spice', 'anti-inflammatory', 'brain health']},
{"if": {"food": "broccoli"}, "then": ['vegetable', 'fiber', 'vitamin K', 'brain health']},
{"if": {"food": "dark leafy greens"}, "then": ['vegetable', 'fiber', 'vitamin K', 'folate']},
{"if": {"food": "quinoa"}, "then": ['whole grain', 'protein', 'magnesium']},
{"if": {"food": "sweet potatoes"}, "then": ['vegetable', 'potassium', 'fiber', 'carb']},
{"if": {"food": "yogurt"}, "then": ['dairy', 'probiotic', 'protein', 'calcium']},
{"if": {"food": "tofu"}, "then": ['soy', 'protein', 'calcium']},
{"if": {"food": "chicken breast"}, "then": ['protein', 'lean meat']},
{"if": {"food": "kiwi"}, "then": ['fruit', 'antioxidant', 'sleep']},
{"if": {"food": "tart cherry juice"}, "then": ['drink', 'melatonin', 'sleep']},
{"if": {"food": "pumpkin"}, "then": ['vegetable', 'magnesium', 'fiber']},
{"if": {"food": "chamomile tea"}, "then": ['herb', 'drink', 'sleep aid']},
{"if": {"food": "lettuce"}, "then": ['vegetable', 'sleep aid']},
{"if": {"food": "pears"}, "then": ['fruit', 'fiber', 'natural sugar']},
{"if": {"food": "apples"}, "then": ['fruit', 'fiber', 'pectin']},
{"if": {"food": "artichokes"}, "then": ['vegetable', 'fiber', 'prebiotic']},
{"if": {"food": "okra"}, "then": ['vegetable', 'fiber', 'gut health']},
{"if": {"food": "barley"}, "then": ['whole grain', 'fiber', 'beta-glucan']},
{"if": {"food": "mackerel"}, "then": ['fish', 'omega-3', 'protein']},
{"if": {"food": "edamame"}, "then": ['soy', 'fiber', 'protein']},
{"if": {"food": "brown rice"}, "then": ['whole grain', 'fiber', 'carb']},
{"if": {"food": "beetroot juice"}, "then": ['drink', 'natural sugar', 'blood pressure']},
{"if": {"food": "cabbage"}, "then": ['vegetable', 'fiber', 'antioxidant']},
{"if": {"food": "sunflower seeds"}, "then": ['seed', 'vitamin E', 'mood support']},
{"if": {"food": "oily fish"}, "then": ['fish', 'omega-3', 'vitamin D']},
{"if": {"food": "asparagus"}, "then": ['vegetable', 'folate', 'fiber']},
{"if": {"food": "low-protein snacks"}, "then": ['low protein', 'snack']},
{"if": {"food": "rice cakes"}, "then": ['low protein', 'carb']},
{"if": {"food": "vegetable broth"}, "then": ['drink', 'low protein', 'soup', 'vegetable']}
]

def recommend_food_by_medication(selected_meds):
    recommended = set()
    restricted = set()
    for med in selected_meds:
        for rule in medication_food_rules:
            if med.lower() == rule["if"]["medication"].lower():
                for cat in rule["then"].get("recommended_food_categories", []):
                    recommended.add(cat["category"])
                for cat in rule["then"].get("restricted_food_categories", []):
                    restricted.add(cat["category"])
    return {
        "recommended": sorted(recommended),
        "restricted": sorted(restricted)
    }


def recommend_meals_from_foods(recommended_foods_by_meal, meal_type=None):
    ingredient_to_meal_rules = [
    {
        "if": {
            "includes": [
                "prunes"
            ],
            "meal": "breakfast"
        },
        "then": [
            "prune oatmeal with nuts and honey"
        ]
    },
    {
        "if": {
            "includes": [
                "prunes"
            ],
            "meal": "lunch"
        },
        "then": [
            "spinach and prune salad"
        ]
    },
    {
        "if": {
            "includes": [
                "whole grains"
            ],
            "meal": "breakfast"
        },
        "then": [
            "whole grain toast with avocado"
        ]
    },
    {
        "if": {
            "includes": [
                "whole grains"
            ],
            "meal": "lunch"
        },
        "then": [
            "quinoa and veggie bowl"
        ]
    },
    {
        "if": {
            "includes": [
                "legumes"
            ],
            "meal": "breakfast"
        },
        "then": [
            "legume breakfast burrito"
        ]
    },
    {
        "if": {
            "includes": [
                "legumes"
            ],
            "meal": "lunch"
        },
        "then": [
            "lentil soup with whole grain bread"
        ]
    },
    {
        "if": {
            "includes": [
                "beans"
            ],
            "meal": "breakfast"
        },
        "then": [
            "black bean and egg breakfast wrap"
        ]
    },
    {
        "if": {
            "includes": [
                "beans"
            ],
            "meal": "lunch"
        },
        "then": [
            "bean salad with leafy greens"
        ]
    },
    {
        "if": {
            "includes": [
                "flaxseeds"
            ],
            "meal": "breakfast"
        },
        "then": [
            "flaxseed smoothie"
        ]
    },
    {
        "if": {
            "includes": [
                "flaxseeds"
            ],
            "meal": "lunch"
        },
        "then": [
            "salad with flaxseed topping"
        ]
    },
    {
        "if": {
            "includes": [
                "oats"
            ],
            "meal": "breakfast"
        },
        "then": [
            "classic oatmeal with fruits"
        ]
    },
    {
        "if": {
            "includes": [
                "oats"
            ],
            "meal": "lunch"
        },
        "then": [
            "oat patties with salad"
        ]
    },
    {
        "if": {
            "includes": [
                "beets"
            ],
            "meal": "breakfast"
        },
        "then": [
            "beet smoothie bowl"
        ]
    },
    {
        "if": {
            "includes": [
                "beets"
            ],
            "meal": "lunch"
        },
        "then": [
            "roasted beet salad"
        ]
    },
    {
        "if": {
            "includes": [
                "vegetables"
            ],
            "meal": "breakfast"
        },
        "then": [
            "vegetable omelet"
        ]
    },
    {
        "if": {
            "includes": [
                "vegetables"
            ],
            "meal": "lunch"
        },
        "then": [
            "grilled vegetable wrap"
        ]
    },
    {
        "if": {
            "includes": [
                "fiber-rich foods"
            ],
            "meal": "breakfast"
        },
        "then": [
            "fiber cereal with milk"
        ]
    },
    {
        "if": {
            "includes": [
                "fiber-rich foods"
            ],
            "meal": "lunch"
        },
        "then": [
            "fiber-rich grain bowl"
        ]
    },
    {
        "if": {
            "includes": [
                "iron-rich foods"
            ],
            "meal": "breakfast"
        },
        "then": [
            "iron-fortified cereal"
        ]
    },
    {
        "if": {
            "includes": [
                "iron-rich foods"
            ],
            "meal": "lunch"
        },
        "then": [
            "spinach and lentil curry"
        ]
    },
    {
        "if": {
            "includes": [
                "spinach"
            ],
            "meal": "breakfast"
        },
        "then": [
            "spinach and feta omelet"
        ]
    },
    {
        "if": {
            "includes": [
                "spinach"
            ],
            "meal": "lunch"
        },
        "then": [
            "spinach and quinoa salad"
        ]
    },
    {
        "if": {
            "includes": [
                "nuts"
            ],
            "meal": "breakfast"
        },
        "then": [
            "nuts and yogurt parfait"
        ]
    },
    {
        "if": {
            "includes": [
                "nuts"
            ],
            "meal": "lunch"
        },
        "then": [
            "almond-crusted chicken salad"
        ]
    },
    {
        "if": {
            "includes": [
                "berries"
            ],
            "meal": "breakfast"
        },
        "then": [
            "berries with yogurt and granola"
        ]
    },
    {
        "if": {
            "includes": [
                "berries"
            ],
            "meal": "lunch"
        },
        "then": [
            "berry spinach salad"
        ]
    },
    {
        "if": {
            "includes": [
                "lentils"
            ],
            "meal": "breakfast"
        },
        "then": [
            "lentil and egg breakfast hash"
        ]
    },
    {
        "if": {
            "includes": [
                "lentils"
            ],
            "meal": "lunch"
        },
        "then": [
            "lentil curry with brown rice"
        ]
    },
    {
        "if": {
            "includes": [
                "leafy greens"
            ],
            "meal": "breakfast"
        },
        "then": [
            "green smoothie with leafy greens"
        ]
    },
    {
        "if": {
            "includes": [
                "leafy greens"
            ],
            "meal": "lunch"
        },
        "then": [
            "leafy green salad with grilled chicken"
        ]
    },
    {
        "if": {
            "includes": [
                "low-sodium soup"
            ],
            "meal": "breakfast"
        },
        "then": [
            "low-sodium miso soup"
        ]
    },
    {
        "if": {
            "includes": [
                "low-sodium soup"
            ],
            "meal": "lunch"
        },
        "then": [
            "vegetable low-sodium soup with crackers"
        ]
    },
    {
        "if": {
            "includes": [
                "avocados"
            ],
            "meal": "breakfast"
        },
        "then": [
            "avocado toast with poached egg"
        ]
    },
    {
        "if": {
            "includes": [
                "avocados"
            ],
            "meal": "lunch"
        },
        "then": [
            "avocado salad with beans and corn"
        ]
    },
    {
        "if": {
            "includes": [
                "fish with omega-3"
            ],
            "meal": "breakfast"
        },
        "then": [
            "smoked salmon on whole grain toast"
        ]
    },
    {
        "if": {
            "includes": [
                "fish with omega-3"
            ],
            "meal": "lunch"
        },
        "then": [
            "grilled salmon with quinoa"
        ]
    },
    {
        "if": {
            "includes": [
                "low-sodium foods"
            ],
            "meal": "breakfast"
        },
        "then": [
            "low-sodium oatmeal with fruit"
        ]
    },
    {
        "if": {
            "includes": [
                "low-sodium foods"
            ],
            "meal": "lunch"
        },
        "then": [
            "low-sodium chicken and veggie wrap"
        ]
    },
    {
        "if": {
            "includes": [
                "omega-3 fatty acids"
            ],
            "meal": "breakfast"
        },
        "then": [
            "chia pudding with walnuts"
        ]
    },
    {
        "if": {
            "includes": [
                "omega-3 fatty acids"
            ],
            "meal": "lunch"
        },
        "then": [
            "flaxseed and tuna salad"
        ]
    },
    {
        "if": {
            "includes": [
                "olive oil"
            ],
            "meal": "breakfast"
        },
        "then": [
            "whole grain toast with olive oil and herbs"
        ]
    },
    {
        "if": {
            "includes": [
                "olive oil"
            ],
            "meal": "lunch"
        },
        "then": [
            "roasted veggies with olive oil drizzle"
        ]
    },
    {
        "if": {
            "includes": [
                "cherries"
            ],
            "meal": "breakfast"
        },
        "then": [
            "cherry smoothie"
        ]
    },
    {
        "if": {
            "includes": [
                "cherries"
            ],
            "meal": "lunch"
        },
        "then": [
            "grilled chicken with cherry glaze"
        ]
    },
    {
        "if": {
            "includes": [
                "almonds"
            ],
            "meal": "breakfast"
        },
        "then": [
            "almond butter toast"
        ]
    },
    {
        "if": {
            "includes": [
                "almonds"
            ],
            "meal": "lunch"
        },
        "then": [
            "almond-crusted tofu"
        ]
    },
    {
        "if": {
            "includes": [
                "bananas"
            ],
            "meal": "breakfast"
        },
        "then": [
            "banana and peanut butter toast"
        ]
    },
    {
        "if": {
            "includes": [
                "bananas"
            ],
            "meal": "lunch"
        },
        "then": [
            "banana spinach salad"
        ]
    },
    {
        "if": {
            "includes": [
                "low-salt meals"
            ],
            "meal": "breakfast"
        },
        "then": [
            "low-salt muesli with milk"
        ]
    },
    {
        "if": {
            "includes": [
                "low-salt meals"
            ],
            "meal": "lunch"
        },
        "then": [
            "steamed veggies and low-salt chicken"
        ]
    },
    {
        "if": {
            "includes": [
                "warm milk"
            ],
            "meal": "breakfast"
        },
        "then": [
            "warm milk with cinnamon and oats"
        ]
    },
    {
        "if": {
            "includes": [
                "warm milk"
            ],
            "meal": "lunch"
        },
        "then": [
            "creamy soup with milk base"
        ]
    },
    {
        "if": {
            "includes": [
                "magnesium-rich foods"
            ],
            "meal": "breakfast"
        },
        "then": [
            "magnesium-fortified cereal"
        ]
    },
    {
        "if": {
            "includes": [
                "magnesium-rich foods"
            ],
            "meal": "lunch"
        },
        "then": [
            "spinach and pumpkin seed salad"
        ]
    },
    {
        "if": {
            "includes": [
                "walnuts"
            ],
            "meal": "breakfast"
        },
        "then": [
            "walnut oatmeal"
        ]
    },
    {
        "if": {
            "includes": [
                "walnuts"
            ],
            "meal": "lunch"
        },
        "then": [
            "walnut and beetroot salad"
        ]
    },
    {
        "if": {
            "includes": [
                "greens"
            ],
            "meal": "breakfast"
        },
        "then": [
            "green veggie scramble"
        ]
    },
    {
        "if": {
            "includes": [
                "greens"
            ],
            "meal": "lunch"
        },
        "then": [
            "mixed green salad with eggs"
        ]
    },
    {
        "if": {
            "includes": [
                "salmon"
            ],
            "meal": "breakfast"
        },
        "then": [
            "salmon and avocado toast"
        ]
    },
    {
        "if": {
            "includes": [
                "salmon"
            ],
            "meal": "lunch"
        },
        "then": [
            "grilled salmon bowl"
        ]
    },
    {
        "if": {
            "includes": [
                "dark chocolate"
            ],
            "meal": "breakfast"
        },
        "then": [
            "dark chocolate smoothie"
        ]
    },
    {
        "if": {
            "includes": [
                "dark chocolate"
            ],
            "meal": "lunch"
        },
        "then": [
            "salad with dark chocolate vinaigrette"
        ]
    },
    {
        "if": {
            "includes": [
                "fiber-rich cereals"
            ],
            "meal": "breakfast"
        },
        "then": [
            "fiber-rich cereal with berries"
        ]
    },
    {
        "if": {
            "includes": [
                "fiber-rich cereals"
            ],
            "meal": "lunch"
        },
        "then": [
            "cereal-crusted chicken wrap"
        ]
    },
    {
        "if": {
            "includes": [
                "chia seeds"
            ],
            "meal": "breakfast"
        },
        "then": [
            "chia seed pudding"
        ]
    },
    {
        "if": {
            "includes": [
                "chia seeds"
            ],
            "meal": "lunch"
        },
        "then": [
            "chia seed salad"
        ]
    },
    {
        "if": {
            "includes": [
                "protein-rich meals"
            ],
            "meal": "breakfast"
        },
        "then": [
            "egg white protein scramble"
        ]
    },
    {
        "if": {
            "includes": [
                "protein-rich meals"
            ],
            "meal": "lunch"
        },
        "then": [
            "chicken and lentil bowl"
        ]
    },
    {
        "if": {
            "includes": [
                "herbal teas"
            ],
            "meal": "breakfast"
        },
        "then": [
            "herbal tea with whole grain toast"
        ]
    },
    {
        "if": {
            "includes": [
                "herbal teas"
            ],
            "meal": "lunch"
        },
        "then": [
            "grilled veggie sandwich with tea"
        ]
    },
    {
        "if": {
            "includes": [
                "low sugar snacks"
            ],
            "meal": "breakfast"
        },
        "then": [
            "low sugar granola with yogurt"
        ]
    },
    {
        "if": {
            "includes": [
                "low sugar snacks"
            ],
            "meal": "lunch"
        },
        "then": [
            "low sugar fruit salad"
        ]
    },
    {
        "if": {
            "includes": [
                "warm herbal tea"
            ],
            "meal": "breakfast"
        },
        "then": [
            "warm herbal tea with toast"
        ]
    },
    {
        "if": {
            "includes": [
                "warm herbal tea"
            ],
            "meal": "lunch"
        },
        "then": [
            "herbal tea and salad combo"
        ]
    },
    {
        "if": {
            "includes": [
                "potassium-rich fruits"
            ],
            "meal": "breakfast"
        },
        "then": [
            "smoothie with bananas and kiwi"
        ]
    },
    {
        "if": {
            "includes": [
                "potassium-rich fruits"
            ],
            "meal": "lunch"
        },
        "then": [
            "potassium-rich fruit salad"
        ]
    },
    {
        "if": {
            "includes": [
                "pumpkin seeds"
            ],
            "meal": "breakfast"
        },
        "then": [
            "pumpkin seed granola"
        ]
    },
    {
        "if": {
            "includes": [
                "pumpkin seeds"
            ],
            "meal": "lunch"
        },
        "then": [
            "salad with pumpkin seed topping"
        ]
    },
    {
        "if": {
            "includes": [
                "green leafy vegetables"
            ],
            "meal": "breakfast"
        },
        "then": [
            "leafy veggie omelet"
        ]
    },
    {
        "if": {
            "includes": [
                "green leafy vegetables"
            ],
            "meal": "lunch"
        },
        "then": [
            "green leafy stir-fry"
        ]
    },
    {
        "if": {
            "includes": [
                "eggs"
            ],
            "meal": "breakfast"
        },
        "then": [
            "scrambled eggs with spinach"
        ]
    },
    {
        "if": {
            "includes": [
                "eggs"
            ],
            "meal": "lunch"
        },
        "then": [
            "egg salad wrap"
        ]
    },
    {
        "if": {
            "includes": [
                "blueberries"
            ],
            "meal": "breakfast"
        },
        "then": [
            "blueberry pancakes"
        ]
    },
    {
        "if": {
            "includes": [
                "blueberries"
            ],
            "meal": "lunch"
        },
        "then": [
            "spinach salad with blueberries"
        ]
    },
    {
        "if": {
            "includes": [
                "turmeric"
            ],
            "meal": "breakfast"
        },
        "then": [
            "turmeric latte"
        ]
    },
    {
        "if": {
            "includes": [
                "turmeric"
            ],
            "meal": "lunch"
        },
        "then": [
            "turmeric rice and veggies"
        ]
    },
    {
        "if": {
            "includes": [
                "broccoli"
            ],
            "meal": "breakfast"
        },
        "then": [
            "broccoli and cheese omelet"
        ]
    },
    {
        "if": {
            "includes": [
                "broccoli"
            ],
            "meal": "lunch"
        },
        "then": [
            "steamed broccoli with rice"
        ]
    },
    {
        "if": {
            "includes": [
                "dark leafy greens"
            ],
            "meal": "breakfast"
        },
        "then": [
            "green smoothie with kale"
        ]
    },
    {
        "if": {
            "includes": [
                "dark leafy greens"
            ],
            "meal": "lunch"
        },
        "then": [
            "dark leafy greens and chickpea salad"
        ]
    },
    {
        "if": {
            "includes": [
                "quinoa"
            ],
            "meal": "breakfast"
        },
        "then": [
            "quinoa porridge"
        ]
    },
    {
        "if": {
            "includes": [
                "quinoa"
            ],
            "meal": "lunch"
        },
        "then": [
            "quinoa bowl with veggies"
        ]
    },
    {
        "if": {
            "includes": [
                "sweet potatoes"
            ],
            "meal": "breakfast"
        },
        "then": [
            "sweet potato hash"
        ]
    },
    {
        "if": {
            "includes": [
                "sweet potatoes"
            ],
            "meal": "lunch"
        },
        "then": [
            "baked sweet potato with beans"
        ]
    },
    {
        "if": {
            "includes": [
                "yogurt"
            ],
            "meal": "breakfast"
        },
        "then": [
            "yogurt with honey and granola"
        ]
    },
    {
        "if": {
            "includes": [
                "yogurt"
            ],
            "meal": "lunch"
        },
        "then": [
            "cucumber yogurt salad"
        ]
    },
    {
        "if": {
            "includes": [
                "tofu"
            ],
            "meal": "breakfast"
        },
        "then": [
            "tofu scramble"
        ]
    },
    {
        "if": {
            "includes": [
                "tofu"
            ],
            "meal": "lunch"
        },
        "then": [
            "tofu stir fry"
        ]
    },
    {
        "if": {
            "includes": [
                "chicken breast"
            ],
            "meal": "breakfast"
        },
        "then": [
            "chicken and egg breakfast wrap"
        ]
    },
    {
        "if": {
            "includes": [
                "chicken breast"
            ],
            "meal": "lunch"
        },
        "then": [
            "grilled chicken salad"
        ]
    },
    {
        "if": {
            "includes": [
                "kiwi"
            ],
            "meal": "breakfast"
        },
        "then": [
            "kiwi smoothie"
        ]
    },
    {
        "if": {
            "includes": [
                "kiwi"
            ],
            "meal": "lunch"
        },
        "then": [
            "kiwi and spinach salad"
        ]
    },
    {
        "if": {
            "includes": [
                "tart cherry juice"
            ],
            "meal": "breakfast"
        },
        "then": [
            "tart cherry juice with oatmeal"
        ]
    },
    {
        "if": {
            "includes": [
                "tart cherry juice"
            ],
            "meal": "lunch"
        },
        "then": [
            "cherry juice and veggie wrap"
        ]
    },
    {
        "if": {
            "includes": [
                "pumpkin"
            ],
            "meal": "breakfast"
        },
        "then": [
            "pumpkin pancakes"
        ]
    },
    {
        "if": {
            "includes": [
                "pumpkin"
            ],
            "meal": "lunch"
        },
        "then": [
            "roasted pumpkin soup"
        ]
    },
    {
        "if": {
            "includes": [
                "chamomile tea"
            ],
            "meal": "breakfast"
        },
        "then": [
            "chamomile tea and toast"
        ]
    },
    {
        "if": {
            "includes": [
                "chamomile tea"
            ],
            "meal": "lunch"
        },
        "then": [
            "light lunch with chamomile tea"
        ]
    },
    {
        "if": {
            "includes": [
                "lettuce"
            ],
            "meal": "breakfast"
        },
        "then": [
            "lettuce and egg wrap"
        ]
    },
    {
        "if": {
            "includes": [
                "lettuce"
            ],
            "meal": "lunch"
        },
        "then": [
            "lettuce wraps with tofu"
        ]
    },
    {
        "if": {
            "includes": [
                "pears"
            ],
            "meal": "breakfast"
        },
        "then": [
            "pears with cottage cheese"
        ]
    },
    {
        "if": {
            "includes": [
                "pears"
            ],
            "meal": "lunch"
        },
        "then": [
            "pear and walnut salad"
        ]
    },
    {
        "if": {
            "includes": [
                "apples"
            ],
            "meal": "breakfast"
        },
        "then": [
            "apple slices with peanut butter"
        ]
    },
    {
        "if": {
            "includes": [
                "apples"
            ],
            "meal": "lunch"
        },
        "then": [
            "apple and chicken salad"
        ]
    },
    {
        "if": {
            "includes": [
                "artichokes"
            ],
            "meal": "breakfast"
        },
        "then": [
            "artichoke and egg bake"
        ]
    },
    {
        "if": {
            "includes": [
                "artichokes"
            ],
            "meal": "lunch"
        },
        "then": [
            "artichoke pasta"
        ]
    },
    {
        "if": {
            "includes": [
                "okra"
            ],
            "meal": "breakfast"
        },
        "then": [
            "okra and onion scramble"
        ]
    },
    {
        "if": {
            "includes": [
                "okra"
            ],
            "meal": "lunch"
        },
        "then": [
            "okra stew"
        ]
    },
    {
        "if": {
            "includes": [
                "barley"
            ],
            "meal": "breakfast"
        },
        "then": [
            "barley porridge"
        ]
    },
    {
        "if": {
            "includes": [
                "barley"
            ],
            "meal": "lunch"
        },
        "then": [
            "barley and veggie bowl"
        ]
    },
    {
        "if": {
            "includes": [
                "mackerel"
            ],
            "meal": "breakfast"
        },
        "then": [
            "mackerel toast"
        ]
    },
    {
        "if": {
            "includes": [
                "mackerel"
            ],
            "meal": "lunch"
        },
        "then": [
            "grilled mackerel with quinoa"
        ]
    },
    {
        "if": {
            "includes": [
                "edamame"
            ],
            "meal": "breakfast"
        },
        "then": [
            "edamame and egg muffins"
        ]
    },
    {
        "if": {
            "includes": [
                "edamame"
            ],
            "meal": "lunch"
        },
        "then": [
            "edamame and rice bowl"
        ]
    },
    {
        "if": {
            "includes": [
                "brown rice"
            ],
            "meal": "breakfast"
        },
        "then": [
            "brown rice and veggie breakfast bowl"
        ]
    },
    {
        "if": {
            "includes": [
                "brown rice"
            ],
            "meal": "lunch"
        },
        "then": [
            "brown rice with beans"
        ]
    },
    {
        "if": {
            "includes": [
                "beetroot juice"
            ],
            "meal": "breakfast"
        },
        "then": [
            "beetroot juice with eggs"
        ]
    },
    {
        "if": {
            "includes": [
                "beetroot juice"
            ],
            "meal": "lunch"
        },
        "then": [
            "beetroot juice and sandwich"
        ]
    },
    {
        "if": {
            "includes": [
                "cabbage"
            ],
            "meal": "breakfast"
        },
        "then": [
            "cabbage and egg stir fry"
        ]
    },
    {
        "if": {
            "includes": [
                "cabbage"
            ],
            "meal": "lunch"
        },
        "then": [
            "cabbage slaw with chicken"
        ]
    },
    {
        "if": {
            "includes": [
                "sunflower seeds"
            ],
            "meal": "breakfast"
        },
        "then": [
            "sunflower seed yogurt bowl"
        ]
    },
    {
        "if": {
            "includes": [
                "sunflower seeds"
            ],
            "meal": "lunch"
        },
        "then": [
            "salad with sunflower seeds"
        ]
    },
    {
        "if": {
            "includes": [
                "oily fish"
            ],
            "meal": "breakfast"
        },
        "then": [
            "oily fish toast"
        ]
    },
    {
        "if": {
            "includes": [
                "oily fish"
            ],
            "meal": "lunch"
        },
        "then": [
            "oily fish with whole grains"
        ]
    },
    {
        "if": {
            "includes": [
                "asparagus"
            ],
            "meal": "breakfast"
        },
        "then": [
            "asparagus and egg scramble"
        ]
    },
    {
        "if": {
            "includes": [
                "asparagus"
            ],
            "meal": "lunch"
        },
        "then": [
            "roasted asparagus with chicken"
        ]
    },
    {
        "if": {
            "includes": [
                "low-protein snacks"
            ],
            "meal": "breakfast"
        },
        "then": [
            "low-protein crackers with fruit"
        ]
    },
    {
        "if": {
            "includes": [
                "low-protein snacks"
            ],
            "meal": "lunch"
        },
        "then": [
            "vegetable stir fry with rice"
        ]
    },
    {
        "if": {
            "includes": [
                "rice cakes"
            ],
            "meal": "breakfast"
        },
        "then": [
            "rice cakes with almond butter"
        ]
    },
    {
        "if": {
            "includes": [
                "rice cakes"
            ],
            "meal": "lunch"
        },
        "then": [
            "rice cakes with avocado and veggies"
        ]
    },
    {
        "if": {
            "includes": [
                "vegetable broth"
            ],
            "meal": "breakfast"
        },
        "then": [
            "vegetable broth with toast"
        ]
    },
    {
        "if": {
            "includes": [
                "vegetable broth"
            ],
            "meal": "lunch"
        },
        "then": [
            "noodle soup with vegetable broth"
        ]
    },
    {
        "if": {
            "includes": [
                "olive oil"
            ],
            "meal": "dinner"
        },
        "then": [
            "olive oil dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "apples"
            ],
            "meal": "dinner"
        },
        "then": [
            "apples dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "cherries"
            ],
            "meal": "dinner"
        },
        "then": [
            "cherries dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "warm herbal tea"
            ],
            "meal": "dinner"
        },
        "then": [
            "warm herbal tea dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "barley"
            ],
            "meal": "dinner"
        },
        "then": [
            "barley dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "pears"
            ],
            "meal": "dinner"
        },
        "then": [
            "pears dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "edamame"
            ],
            "meal": "dinner"
        },
        "then": [
            "edamame dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "green leafy vegetables"
            ],
            "meal": "dinner"
        },
        "then": [
            "green leafy vegetables dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "fish with omega-3"
            ],
            "meal": "dinner"
        },
        "then": [
            "fish with omega-3 dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "low-sodium foods"
            ],
            "meal": "dinner"
        },
        "then": [
            "low-sodium foods dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "yogurt"
            ],
            "meal": "dinner"
        },
        "then": [
            "yogurt dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "pumpkin"
            ],
            "meal": "dinner"
        },
        "then": [
            "pumpkin dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "blueberries"
            ],
            "meal": "dinner"
        },
        "then": [
            "blueberries dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "mackerel"
            ],
            "meal": "dinner"
        },
        "then": [
            "mackerel dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "vegetable broth"
            ],
            "meal": "dinner"
        },
        "then": [
            "vegetable broth dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "protein-rich meals"
            ],
            "meal": "dinner"
        },
        "then": [
            "protein-rich meals dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "warm milk"
            ],
            "meal": "dinner"
        },
        "then": [
            "warm milk dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "berries"
            ],
            "meal": "dinner"
        },
        "then": [
            "berries dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "magnesium-rich foods"
            ],
            "meal": "dinner"
        },
        "then": [
            "magnesium-rich foods dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "almonds"
            ],
            "meal": "dinner"
        },
        "then": [
            "almonds dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "eggs"
            ],
            "meal": "dinner"
        },
        "then": [
            "eggs dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "walnuts"
            ],
            "meal": "dinner"
        },
        "then": [
            "walnuts dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "salmon"
            ],
            "meal": "dinner"
        },
        "then": [
            "salmon dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "broccoli"
            ],
            "meal": "dinner"
        },
        "then": [
            "broccoli dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "quinoa"
            ],
            "meal": "dinner"
        },
        "then": [
            "quinoa dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "chicken breast"
            ],
            "meal": "dinner"
        },
        "then": [
            "chicken breast dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "chamomile tea"
            ],
            "meal": "dinner"
        },
        "then": [
            "chamomile tea dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "dark chocolate"
            ],
            "meal": "dinner"
        },
        "then": [
            "dark chocolate dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "lettuce"
            ],
            "meal": "dinner"
        },
        "then": [
            "lettuce dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "rice cakes"
            ],
            "meal": "dinner"
        },
        "then": [
            "rice cakes dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "brown rice"
            ],
            "meal": "dinner"
        },
        "then": [
            "brown rice dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "sunflower seeds"
            ],
            "meal": "dinner"
        },
        "then": [
            "sunflower seeds dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "vegetables"
            ],
            "meal": "dinner"
        },
        "then": [
            "vegetables dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "pumpkin seeds"
            ],
            "meal": "dinner"
        },
        "then": [
            "pumpkin seeds dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "prunes"
            ],
            "meal": "dinner"
        },
        "then": [
            "prunes dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "beets"
            ],
            "meal": "dinner"
        },
        "then": [
            "beets dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "tofu"
            ],
            "meal": "dinner"
        },
        "then": [
            "tofu dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "chia seeds"
            ],
            "meal": "dinner"
        },
        "then": [
            "chia seeds dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "asparagus"
            ],
            "meal": "dinner"
        },
        "then": [
            "asparagus dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "turmeric"
            ],
            "meal": "dinner"
        },
        "then": [
            "turmeric dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "legumes"
            ],
            "meal": "dinner"
        },
        "then": [
            "legumes dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "whole grains"
            ],
            "meal": "dinner"
        },
        "then": [
            "whole grains dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "nuts"
            ],
            "meal": "dinner"
        },
        "then": [
            "nuts dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "lentils"
            ],
            "meal": "dinner"
        },
        "then": [
            "lentils dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "greens"
            ],
            "meal": "dinner"
        },
        "then": [
            "greens dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "leafy greens"
            ],
            "meal": "dinner"
        },
        "then": [
            "leafy greens dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "low-protein snacks"
            ],
            "meal": "dinner"
        },
        "then": [
            "low-protein snacks dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "fiber-rich cereals"
            ],
            "meal": "dinner"
        },
        "then": [
            "fiber-rich cereals dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "low-salt meals"
            ],
            "meal": "dinner"
        },
        "then": [
            "low-salt meals dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "omega-3 fatty acids"
            ],
            "meal": "dinner"
        },
        "then": [
            "omega-3 fatty acids dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "flaxseeds"
            ],
            "meal": "dinner"
        },
        "then": [
            "flaxseeds dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "oily fish"
            ],
            "meal": "dinner"
        },
        "then": [
            "oily fish dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "avocados"
            ],
            "meal": "dinner"
        },
        "then": [
            "avocados dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "low sugar snacks"
            ],
            "meal": "dinner"
        },
        "then": [
            "low sugar snacks dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "dark leafy greens"
            ],
            "meal": "dinner"
        },
        "then": [
            "dark leafy greens dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "fiber-rich foods"
            ],
            "meal": "dinner"
        },
        "then": [
            "fiber-rich foods dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "tart cherry juice"
            ],
            "meal": "dinner"
        },
        "then": [
            "tart cherry juice dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "low-sodium soup"
            ],
            "meal": "dinner"
        },
        "then": [
            "low-sodium soup dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "beetroot juice"
            ],
            "meal": "dinner"
        },
        "then": [
            "beetroot juice dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "okra"
            ],
            "meal": "dinner"
        },
        "then": [
            "okra dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "cabbage"
            ],
            "meal": "dinner"
        },
        "then": [
            "cabbage dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "oats"
            ],
            "meal": "dinner"
        },
        "then": [
            "oats dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "beans"
            ],
            "meal": "dinner"
        },
        "then": [
            "beans dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "herbal teas"
            ],
            "meal": "dinner"
        },
        "then": [
            "herbal teas dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "sweet potatoes"
            ],
            "meal": "dinner"
        },
        "then": [
            "sweet potatoes dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "kiwi"
            ],
            "meal": "dinner"
        },
        "then": [
            "kiwi dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "artichokes"
            ],
            "meal": "dinner"
        },
        "then": [
            "artichokes dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "potassium-rich fruits"
            ],
            "meal": "dinner"
        },
        "then": [
            "potassium-rich fruits dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "bananas"
            ],
            "meal": "dinner"
        },
        "then": [
            "bananas dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "iron-rich foods"
            ],
            "meal": "dinner"
        },
        "then": [
            "iron-rich foods dinner bowl with herbs and grains"
        ]
    },
    {
        "if": {
            "includes": [
                "spinach"
            ],
            "meal": "dinner"
        },
        "then": [
            "spinach dinner bowl with herbs and grains"
        ]
    }
    ]
    valid_meals = ["breakfast", "lunch", "dinner"]
    if meal_type and meal_type in valid_meals:
        meals_to_check = [meal_type]
    else:
        meals_to_check = valid_meals

    meal_suggestions = {meal: [] for meal in meals_to_check}
    for meal in meals_to_check:
        foods = recommended_foods_by_meal.get(meal, [])
        for food in foods:
            for rule in ingredient_to_meal_rules:
                cond = rule["if"]
                if meal == cond.get("meal") and any(food.lower() == inc.lower() for inc in cond.get("includes", [])):
                    for suggestion in rule["then"]:
                        # Find which recommended foods are in the suggestion
                        matched_foods = [f for f in foods if f.lower() in [inc.lower() for inc in cond.get("includes", [])]]
                        # Gather all ingredients for those foods
                        ingredients = []
                        for mf in matched_foods:
                            ingredients.extend(next((item["then"] for item in FOOD_CATEGORIES if item["if"]["food"] == mf), []))
                            meal_suggestions[meal].append({
                            "suggestion": suggestion,
                            "matched_foods": matched_foods,
                            "ingredients": sorted(set(ingredients))
                        })
    return meal_suggestions


def get_medication_restricted_categories(selected_meds, medication_food_rules):
    restricted = set()
    for med in selected_meds:
        for rule in medication_food_rules:
            if med.lower() == rule["if"]["medication"].lower():
                for cat in rule["then"].get("restricted_food_categories", []):
                    restricted.add(cat["category"].lower())
    return restricted

def get_restricted_categories_by_disease(diseases, restricted_food_rules_disease):
    restricted = set()
    for rule in restricted_food_rules_disease:
        cond = rule["if"]
        if "disease" in cond and cond["disease"] in diseases:
            restricted.update([cat.lower() for cat in rule["then"]])
    return restricted

def get_restricted_categories_by_symptom(symptoms, restricted_food_rules_symptom):
    restricted = set()
    for rule in restricted_food_rules_symptom:
        cond = rule["if"]
        if "symptom" in cond and cond["symptom"] in symptoms:
            restricted.update([cat.lower() for cat in rule["then"]])
    return restricted


def filter_foods_by_categories(recommendations, restricted_categories, FOOD_CATEGORIES):
    filtered = {}
    for meal, foods in recommendations.items():
        filtered[meal] = []
        for food in foods:
            categories = [c.lower() for c in next((item["then"] for item in FOOD_CATEGORIES if item["if"]["food"] == food), [])]
            if not any(rc in categories for rc in restricted_categories):
                filtered[meal].append(food)
        filtered[meal] = sorted(set(filtered[meal]))
    return filtered



def recommend_food_by_age(age, symptoms, diseases=None, meal=None, medications=None):
    symptoms = [s.lower().strip() for s in symptoms] if symptoms else []
    diseases = [d.lower().strip() for d in diseases] if diseases else []
    medications = medications or []
    valid_meals = ["breakfast", "lunch", "dinner"]
    recommendations = {m: set() for m in valid_meals}

    # If diseases are provided, use the original logic
    if diseases:
        for symptom in symptoms:
            for m in valid_meals:
                if meal and m != meal:
                    continue
                # Find the highest age_min for this symptom/meal/disease
                max_age_min = max(
                    [rule["if"].get("age_min", 0) for rule in food_rules
                    if symptom == rule["if"].get("symptom")
                    and "disease" not in rule["if"]
                    and m == rule["if"].get("meal")
                    and age >= rule["if"].get("age_min", 0)],
                    default=0
                )
                for rule in food_rules:
                    cond = rule["if"]
                    if (
                        cond.get("age_min", 0) == max_age_min
                        and symptom == cond.get("symptom")
                        and "disease" in cond
                        and cond.get("disease") in diseases
                        and m == cond.get("meal")
                    ):
                        # ...inside recommend_food_by_age...
                        for food in rule["then"]:
                            recommendations[m].add(food)
                       
    else:
    # If no diseases, match rules that have only symptom (no disease key)
        for symptom in symptoms:
            for m in valid_meals:
                if meal and m != meal:
                    continue
                # Find the highest age_min for this symptom/meal
                max_age_min = max(
                    [rule["if"].get("age_min", 0) for rule in food_rules
                    if symptom == rule["if"].get("symptom")
                    and "disease" not in rule["if"]
                    and m == rule["if"].get("meal")
                    and age >= rule["if"].get("age_min", 0)],
                    default=0
                )
                for rule in food_rules:
                    cond = rule["if"]
                    if (
                        cond.get("age_min", 0) == max_age_min
                        and symptom == cond.get("symptom")
                        and "disease" not in cond
                        and m == cond.get("meal")
                    ):
                       
                        for food in rule["then"]:
                            recommendations[m].add(food)
       
    return {m: sorted(list(recommendations[m])) for m in valid_meals}

medication_food_rules = [
        {
            "if": {"medication": "levodopa_carbidopa"},
            "then": {
                "recommended_food_categories": [
                    {"category": "natural sugar", "reason": "Helps reduce constipation, a common side effect of Parkinson’s and its medications."},
                    {"category": "low protein", "reason": "Reduces competition for absorption with levodopa, improving effectiveness."},
                    {"category": "omega-3", "reason": "Supports brain health and may reduce neuroinflammation."},
                    {"category": "antioxidant", "reason": "Helps combat oxidative stress, which is implicated in Parkinson’s disease progression."},
                    {"category": "whole grain", "reason": "Provides steady energy and fiber without interfering with levodopa absorption if taken away from the dose."}
                ],
                "restricted_food_categories": [
                    {"category": "protein", "reason": "High-protein foods compete with levodopa for absorption in the small intestine, reducing its effectiveness."},
                    {"category": "iron", "reason": "Iron binds with levodopa in the gut, forming complexes that prevent proper absorption."},
                    {"category": "fat", "reason": "High-fat meals delay gastric emptying, slowing the absorption of levodopa."},
                    {"category": "calcium", "reason": "Calcium-rich foods (e.g., dairy) may interfere with levodopa absorption similar to iron."},
                    {"category": "dairy", "reason": "Dairy is high in both protein and calcium, which can reduce the effectiveness of levodopa."}
                ]
            }
        },
        {
            "if": {"medication": "dopamine_agonists"},
            "then": {
                "recommended_food_categories": [
                    {"category": "fiber", "reason": "Aids digestion and helps counter medication-induced constipation."},
                    {"category": "antioxidant", "reason": "May protect dopamine-producing neurons from oxidative damage."},
                    {"category": "low sugar", "reason": "Helps avoid triggering impulse control disorders such as binge eating."},
                    {"category": "vegetable", "reason": "Provides essential nutrients and fiber without worsening side effects."},
                    {"category": "hydrating foods", "reason": "Helps prevent dehydration-related dizziness or fainting."}
                ],
                "restricted_food_categories": [
                    {"category": "sugar", "reason": "High-sugar foods can trigger or worsen compulsive behaviors like binge eating."},
                    {"category": "fiber", "reason": "Can exacerbate side effects such as anxiety, insomnia, and jitteriness."},
                    {"category": "alcohol", "reason": "Enhances sedative effects and may worsen dizziness or confusion from the medication."}
                ]
            }
        },
        {
            "if": {"medication": "mao_b_inhibitors"},
            "then": {
                "recommended_food_categories": [
                    {"category": "fiber", "reason": "Improves digestion and helps manage constipation."},
                    {"category": "antioxidant", "reason": "May reduce free radical damage in the brain."},
                    {"category": "folate", "reason": "Supports neurotransmitter synthesis and overall brain health."},
                    {"category": "magnesium", "reason": "Helps reduce muscle cramps and supports nerve function."},
                    {"category": "low sodium", "reason": "Reduces risk of hypertension, especially important when combined with MAO-B inhibitors."}
                ],
                "restricted_food_categories": [
                    {"category": "tyramine", "reason": "Tyramine-rich foods (e.g., aged cheese, fermented products) can cause hypertensive crises when taken with MAO-B inhibitors."},
                    {"category": "fermented", "reason": "Often high in tyramine, which interacts dangerously with MAO-B inhibitors."},
                    {"category": "alcohol", "reason": "May increase the risk of high blood pressure and interfere with medication metabolism."}
                ]
            }
        }
    ]
 
medication_rules = [
        {
            "if": {"medication": "Levodopa Carbidopa"},
            "then": {
                "effectiveness": "Most effective for motor symptoms (tremor, rigidity, bradykinesia)",
                "side_effect_risk": "Moderate to High (especially long-term)",
                "advice": [
                    "Gold standard treatment; side effects increase with long-term use (dyskinesia, hallucinations).",
                    "Best started when symptoms impact daily life.",
                    "Monitor for involuntary movements and hallucinations.",
                    "Take on an empty stomach for best absorption."
                ]
            }
        },
        {
            "if": {"medication": "Dopamine Agonists"},
            "then": {
                "effectiveness": "Moderate; useful especially early or as adjunct therapy",
                "side_effect_risk": "Moderate to High (sleep attacks, compulsive behaviors)",
                "advice": [
                    "Often used early to delay levodopa use.",
                    "Side effects include sudden sleep onset and impulse control disorders (gambling, shopping, eating).",
                    "Requires careful monitoring for behavioral changes."
                ]
            }
        },
        {
            "if": {"medication": "Mao-b Inhibitors"},
            "then": {
                "effectiveness": "Mild to Moderate; may delay need for levodopa",
                "side_effect_risk": "Low to Moderate (insomnia, nausea)",
                "advice": [
                    "Generally well tolerated; mild symptom control.",
                    "Often used early or in combination.",
                    "Monitor for insomnia and nausea."
                ]
            }
        }
    ]
   




from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecommendationRequest(BaseModel):
    age: int
    gender: str
    symptoms: List[str]
    diseases: Optional[List[str]] = []
    medications: Optional[List[str]] = []
    meal: Optional[str] = None

@app.post("/recommend/cli")
def recommend_cli(data: RecommendationRequest):
    age = data.age
    gender = data.gender
    selected_symptoms = data.symptoms
    selected_diseases = data.diseases if data.diseases is not None else []
    selected_meds = data.medications if data.medications is not None else []
    meal_input = data.meal
    valid_meals = ["breakfast", "lunch", "dinner"]

    # Exercise recommendations
    exercise_recs = recommend_exercise_by_profile(age, gender, selected_symptoms, selected_diseases)

    # Food recommendations
    if meal_input == "all" or meal_input not in valid_meals:
        meal_input = None

    recommendations = recommend_food_by_age(
        age, selected_symptoms, selected_diseases, meal_input, selected_meds
    )

    # 1. Add medication-recommended foods to each meal
    if selected_meds:
        med_foods = recommend_food_by_medication(selected_meds)
        med_recommended = med_foods.get("recommended", [])
        target_meals = [meal_input] if meal_input in valid_meals else valid_meals
        for meal in target_meals:
            for food_cat in med_recommended:
                for item in FOOD_CATEGORIES:
                    food = item["if"]["food"]
                    cats = item["then"]
                    if food_cat in [c.lower() for c in cats]:
                        if food not in recommendations[meal]:
                            recommendations[meal].append(food)

    # 2. Gather all restricted categories (medication, disease, symptom)
    restricted_cats = get_medication_restricted_categories(selected_meds, medication_food_rules)
    restricted_cats.update(get_restricted_categories_by_disease(selected_diseases, restricted_food_rules_disease))
    restricted_cats.update(get_restricted_categories_by_symptom(selected_symptoms, restricted_food_rules_symptom))

    # 3. Filter out foods with any restricted category
    recommendations = filter_foods_by_categories(recommendations, restricted_cats, FOOD_CATEGORIES)

    # 4. Only keep foods that are in FOOD_CATEGORIES
    for meal in recommendations:
        recommendations[meal] = [f for f in recommendations[meal] if any(item["if"]["food"] == f for item in FOOD_CATEGORIES)]
        recommendations[meal] = sorted(set(recommendations[meal]))
    recommendations = {meal: foods for meal, foods in recommendations.items() if foods}

    # Additional meal suggestions
    additional_suggestions = recommend_meals_from_foods(recommendations, meal_input)

    # Medication advice
    med_advice = []
    for med in selected_meds:
        for rule in medication_rules:
            if med.lower() == rule["if"]["medication"].lower():
                med_advice.append({
                    "medication": med,
                    "effectiveness": rule["then"]["effectiveness"],
                    "side_effect_risk": rule["then"]["side_effect_risk"],
                    "advice": rule["then"]["advice"]
                })
    # Medication food restrictions
    med_food_restrictions = []
    for med in selected_meds:
        for rule in medication_food_rules:
            if med.lower() == rule["if"]["medication"].lower():
                med_food_restrictions.append({
                    "medication": med,
                    "restricted_food_categories": rule["then"].get("restricted_food_categories", [])
                })

    return {
        "exercise": exercise_recs,
        "food": recommendations,
        "additional_meal_suggestions": additional_suggestions,
        "medication_advice": med_advice,
        "medication_food_restrictions": med_food_restrictions
    }

