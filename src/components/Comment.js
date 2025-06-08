import api from '../api/api.js';
export default {
    name: 'Comment',
    template: `
    <section class="my-comment">
        <div class="comment-container">
            <div class="comment-header">
        <h2>评论</h2>
        </div>
        <div class="comment-content">
            <div class="comment-item">
                <div class="comment-header">
                    <div class="comment-user">
                        <img :src="comment.user.avatar" alt="用户头像">
                        <span>{{ comment.user.username }}</span>
                    </div>
                    <div class="comment-time">
                        {{ comment.createdAt }}
                    </div>
                </div>
                <div class="comment-content">
                    {{ comment.content }}
                </div>
            </div>
        </div>
    </div>
</section>
    `,
    data() {
        return {
            comments: [],
            showDialog: false,
            newComment: ''  
        }
    },
    methods: {
        async fetchComments() {
            try {
                this.comments = await api.getComments();
            } catch (error) {
                console.error('评论失败:', error);
                this.playlists = [];
            }
        },
        showCreateCommentDialog() {
            this.showDialog = true;
            this.newComment = '';
        },
        closeDialog() {
            this.showDialog = false;
        },
        async createComment() {
            if (!this.newComment.trim()) return;
            
            try {
                await api.createComment(this.newComment);
                this.closeDialog();
                await this.fetchComments();
                this.$root.$emit('show-message', {
                    type: 'success',
                    text: '评论成功'
                });
            } catch (error) {
                console.error('评论失败:', error);
                this.$root.$emit('show-message', {
                    type: 'error',
                    text: '评论失败，请重试'
                });
            }
        }
    },
    created() {
        this.fetchPlaylists();
    }
} 