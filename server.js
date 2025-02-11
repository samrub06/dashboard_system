import dotenv from 'dotenv';
import express from 'express';
import cron from 'node-cron';
import simpleGit from 'simple-git';
dotenv.config();

// Configuration de l'environnement
const ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3002;

const app = express();
const git = simpleGit({
  maxConcurrentProcesses: 1,
  timeout: {
    block: 10000 // 10 secondes
  },
  baseDir: process.cwd(),
  binary: 'git',
  ssh: {
    privateKey: process.env.GIT_SSH_PRIVATE_KEY
  }
}).env({
  GIT_AUTHOR_NAME: process.env.GIT_AUTHOR_NAME,
  GIT_AUTHOR_EMAIL: process.env.GIT_AUTHOR_EMAIL,
  GIT_COMMITTER_NAME: process.env.GIT_COMMITTER_NAME,
  GIT_COMMITTER_EMAIL: process.env.GIT_COMMITTER_EMAIL
});

// Middleware pour parser le JSON
app.use(express.json());

// Configurer le remote repository au démarrage
async function initializeGit() {
  try {
    const remoteUrl = process.env.GIT_REPOSITORY_URL;
    const currentRemote = await git.getRemotes();
    
    if (!currentRemote.find(remote => remote.name === 'origin')) {
      await git.addRemote('origin', remoteUrl);
    } else {
      await git.remote(['set-url', 'origin', remoteUrl]);
    }
    console.log('Configuration Git réussie');
  } catch (error) {
    console.error('Erreur lors de la configuration Git:', error);
  }
}

// Appeler la fonction au démarrage
initializeGit();

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

  console.log(`Serveur démarré sur http://localhost:${port}`)
  // ;
}); 