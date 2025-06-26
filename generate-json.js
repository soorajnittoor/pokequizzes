const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const TOTAL_POKEMON = 1025;
const output = [];

(async () => {
  for (let id = 1; id <= TOTAL_POKEMON; id++) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();

      const rawName = data.name;
      const baseName = rawName.split('-')[0]; // Removes suffixes like -ordinary, -gmax
      const displayName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

      output.push({
        name: displayName,
        image: `/sprites/${id}.png`
      });

      console.log(`✅ ${id}: ${displayName}`);
    } catch (err) {
      console.error(`❌ ${id} failed:`, err.message);
    }
  }

  fs.writeFileSync('public/pokemon_full.json', JSON.stringify(output, null, 2));
  console.log('🎉 Finished writing pokemon_full.json!');
})();
