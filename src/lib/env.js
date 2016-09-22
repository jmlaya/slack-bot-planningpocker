import module from 'module';
import env    from 'node-env-file';

if(!process.env.SB_PP_ENV){
    env(__dirname + '/../../.env');
}
process.env.NODE_PATH = `${__dirname}/../`;
module.Module._initPaths();
