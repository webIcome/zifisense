/**
 *
 * Created by spring on 2018/2/5.
 */
export default {
   getPosts(context, companyid) {
       return context.$http.post('post/getListByCompanyid', {companyid: companyid}).then(res => {
           this.posts = res.data.list;
       })
   }
}