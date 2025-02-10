import express from 'express';
import cron from 'node-cron';
import simpleGit from 'simple-git';
const app = express();
const port = 3002;
const git = simpleGit()

// Middleware pour parser le JSON
app.use(express.json());


cron.schedule('0 8 * * *', async() => {
try{
  const gitAddd= git.add('.')
  const gitCommit = git.commit(`commit ${Date.now()}`)
  const gitPush = git.push('origin', 'main')
  await gitAddd()
  await gitCommit()
  await gitPush()
  console.log('Commit automatique effectué avec succès');
}catch (error) {
console.log(error)
}
})

cron.schedule('0 14 * * *', async() => {
  try{
    const gitAddd= git.add('.')
    const gitCommit = git.commit(`commit ${Date.now()}`)
    const gitPush = git.push('origin', 'main')
    await gitAddd()
    await gitCommit()
    await gitPush()
    console.log('Commit automatique effectué avec succès');
  }catch (error) {
  console.log(error)
  }
  })

  cron.schedule('0 20 * * *', async() => {
    try{
      const gitAddd= git.add('.')
      const gitCommit = git.commit(`commit ${Date.now()}`)
      const gitPush = git.push('origin', 'main')
      await gitAddd()
      await gitCommit()
      await gitPush()
      console.log('Commit automatique effectué avec succès');
    }catch (error) {
    console.log(error)
    }
    })

// ... existing code ...

// Ajout d'un endpoint POST pour déclencher le push manuellement
app.post('/trigger-push', async (req, res) => {
  try {
    console.log('Déclenchement du push manuel');
    await git.add('.');
    await git.commit(`commit manuel ${Date.now()}`);
    await git.push('origin', 'main');
    res.json({ message: 'Push manuel effectué avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors du push manuel' });
  }
});

// ... existing code ...


// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
}); 