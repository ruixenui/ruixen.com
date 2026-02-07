import {
  CommentThread,
  Comment,
  CommentAvatar,
  CommentHeader,
  CommentBody,
  CommentToggle,
  CommentReplies,
} from "@/registry/ruixenui/comment-thread";

export default function CommentThreadDemo() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <CommentThread type="multiple" defaultValue={["c-1"]}>
        <Comment value="c-1">
          <CommentHeader>
            <CommentAvatar
              name="Jane Smith"
              src="/avatar-images/avatar-01.jpg"
            />
            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-sm tracking-[-0.01em] text-foreground/80 transition-colors duration-300 group-hover/comment:text-foreground/90">
                  Jane Smith
                </span>
                <span className="text-xs text-foreground/20 transition-colors duration-300 group-hover/comment:text-foreground/30">
                  1h ago
                </span>
              </div>
              <CommentBody>
                This is a great article! Thanks for sharing your insights. I
                particularly enjoyed the section about accessibility best
                practices.
              </CommentBody>
              <CommentToggle>3 replies</CommentToggle>
            </div>
          </CommentHeader>

          <CommentReplies>
            <CommentThread type="multiple" defaultValue={["c-1-1"]}>
              <Comment value="c-1-1">
                <CommentHeader>
                  <CommentAvatar
                    name="Liam Patel"
                    src="/avatar-images/avatar-02.jpg"
                  />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm tracking-[-0.01em] text-foreground/80 transition-colors duration-300 group-hover/comment:text-foreground/90">
                        Liam Patel
                      </span>
                      <span className="text-xs text-foreground/20 transition-colors duration-300 group-hover/comment:text-foreground/30">
                        34m ago
                      </span>
                    </div>
                    <CommentBody>
                      I agree! The examples were particularly helpful. Do you
                      have any recommendations for further reading?
                    </CommentBody>
                    <CommentToggle>1 reply</CommentToggle>
                  </div>
                </CommentHeader>

                <CommentReplies>
                  <CommentThread type="multiple">
                    <Comment value="c-1-1-1">
                      <CommentHeader>
                        <CommentAvatar
                          name="Alex Chen"
                          src="/avatar-images/avatar-03.jpg"
                        />
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm tracking-[-0.01em] text-foreground/80 transition-colors duration-300 group-hover/comment:text-foreground/90">
                              Alex Chen
                            </span>
                            <span className="text-xs text-foreground/20 transition-colors duration-300 group-hover/comment:text-foreground/30">
                              26m ago
                            </span>
                          </div>
                          <CommentBody>
                            Check out the MDN docs on ARIA — they&apos;re
                            comprehensive and well-maintained.
                          </CommentBody>
                        </div>
                      </CommentHeader>
                    </Comment>
                  </CommentThread>
                </CommentReplies>
              </Comment>

              <Comment value="c-1-2">
                <CommentHeader>
                  <CommentAvatar
                    name="Sarah Wilson"
                    src="/avatar-images/avatar-04.jpg"
                  />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm tracking-[-0.01em] text-foreground/80 transition-colors duration-300 group-hover/comment:text-foreground/90">
                        Sarah Wilson
                      </span>
                      <span className="text-xs text-foreground/20 transition-colors duration-300 group-hover/comment:text-foreground/30">
                        14m ago
                      </span>
                    </div>
                    <CommentBody>
                      Thanks for the detailed explanation! This will definitely
                      help with my current project.
                    </CommentBody>
                  </div>
                </CommentHeader>
              </Comment>
            </CommentThread>
          </CommentReplies>
        </Comment>
      </CommentThread>
    </div>
  );
}
