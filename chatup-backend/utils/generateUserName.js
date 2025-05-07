function generateUsername() {
  const adjectives = [
    "Curious",
    "Brave",
    "Witty",
    "Gentle",
    "Creative",
    "Quiet",
    "Lively",
    "Wise",
    "Eloquent",
    "Bold",
    "Thoughtful",
    "Vivid",
    "Mellow",
    "Dynamic",
    "Charming",
    "Snarky",
    "Zesty",
    "Trendy",
    "Genuine",
    "Radiant",
    "Cheerful",
    "Modest",
  ];

  const nouns = [
    "Writer",
    "Dreamer",
    "Thinker",
    "Seeker",
    "Sage",
    "Quill",
    "Wanderer",
    "Artist",
    "Storyteller",
    "Wordsmith",
    "Nomad",
    "Scholar",
    "Blogger",
    "Philosopher",
    "Rambler",
    "Journalist",
    "Poet",
    "Explorer",
    "Observer",
    "Critic",
    "Scribbler",
  ];

  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(Math.random() * 10000); // more digits for uniqueness

  return `${randomAdj}${randomNoun}${randomNum}`;
}

module.exports = generateUsername;