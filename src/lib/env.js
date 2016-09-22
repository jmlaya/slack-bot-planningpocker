import module from 'module';
import env    from 'node-env-file';

if(!process.env.SB_PP){
    env(__dirname + '/../../.env.local');
}
process.env.NODE_PATH = `${__dirname}/../`;
module.Module._initPaths();
