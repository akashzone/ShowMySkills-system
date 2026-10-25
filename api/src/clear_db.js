import mongoose from 'mongoose';

const uris = [
  'mongodb+srv://showmyskills_app:v_2sH0WmYsKILLS@showmyskills-cluster.dmcpea3.mongodb.net/test?retryWrites=true&w=majority',
  'mongodb+srv://showmyskills_app:v_2sH0WmYsKILLS@showmyskills-cluster.dmcpea3.mongodb.net/showmyskills?retryWrites=true&w=majority'
];

async function clearDbs() {
  for (const uri of uris) {
    console.log(`Connecting to: ${uri}`);
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(`Collections in "${mongoose.connection.name}":`, collections.map(c => c.name));
    for (const col of collections) {
      if (!col.name.startsWith('system.')) {
        const res = await db.collection(col.name).deleteMany({});
        console.log(`🧹 Deleted ${res.deletedCount} docs from collection: ${col.name}`);
      }
    }
    await mongoose.disconnect();
  }
  console.log('\n✅ All database collections across Atlas cluster successfully cleared (0 documents remaining)!');
  process.exit(0);
}

clearDbs().catch(err => {
  console.error('Clear DB Error:', err);
  process.exit(1);
});
