import React from 'react';

import * as actions from './actions';
import Example from './HelpExample';
import Link from './uss-router/Link';

import styles from './Help.module.css';

const ACE_URL = 'https://github.com/ajaxorg/ace';
const MAVEN_CENTRAL_URL = 'https://central.sonatype.com/';
const CRATES_URL = 'https://github.com/rust-lang/rust-playground/blob/main/compiler/base/Cargo.toml';
const GIST_URL = 'https://gist.github.com/';
const I32_URL = 'http://integer32.com/';
const LOCALSTORAGE_URL = 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API';
const REPO_URL = 'https://github.com/rust-lang/rust-playground';
const SHEPMASTER_URL = 'https://github.com/shepmaster/';
const RUST_PLAYGROUND_URL = 'https://play.rust-lang.org/help';

const CRATE_EXAMPLE = `import io.vavr.collection.Vector;

class Main {
    public static void main(String[] args) {
        System.out.println(Vector.of(
          "a", "b", "c"
        ));
    }
}
`;

const Help: React.FC = () => {
  return (
    <section className={styles.container}>
      <h1>The Java Playground</h1>
      <Link action={actions.navigateToIndex}>Return to the playground</Link>

      <LinkableSection id="about" header="About" level="h2">
        <p>
          The playground is an <a href={REPO_URL}>open source project</a>.
          If you have any suggestions for features, issues with the
          implementation, or just want to read the code for yourself,
          you are invited to participate!
        </p>

        <p>
          This playground is a fork of the <a href={RUST_PLAYGROUND_URL}>Rust Playground</a>,
          and we owe a great debt to every contributor to
          that project, notably <a href={SHEPMASTER_URL}>Jake Goulding</a> from <a href={I32_URL}>Integer 32</a>.
        </p>
      </LinkableSection>

      <LinkableSection id="features" header="Features" level="h2">
        <LinkableSection id="features-crates" header="Crates" level="h3">
          <p>
            The playground provides a selection of libraries
          from <a href={MAVEN_CENTRAL_URL}>Maven Central</a>. To use a library, add the appropriate
            {' '}
            <Code>import</Code> statements.
          </p>

          <Example code={CRATE_EXAMPLE} />

          <p>
            See the <a href={CRATES_URL}>complete list of libraries</a> to know
            what’s available.
          </p>

          <p>
            If there is a library you want added reach out. So long as it works on the module-path, does not
            require adding any JVM flags, and is relatively maintained or stable it will be considered.
          </p>
        </LinkableSection>

        {/*<LinkableSection id="features-formatting" header="Formatting code" level="h3">
          <p>
            <a href={RUSTFMT_URL}>rustfmt</a> is a tool for formatting Rust code
          according to the Rust style guidelines. Click on the <strong>Format</strong>
            {' '}
            button in the <strong>Tools</strong> menu to automatically reformat your code.
          </p>

          <Example code={RUSTFMT_EXAMPLE} />
        </LinkableSection>*/}

        {/*<LinkableSection id="features-linting" header="Linting code" level="h3">
          <p>
            <a href={CLIPPY_URL}>Clippy</a> is a collection of lints to catch common
          mistakes and improve your Rust code. Click on the <strong>Clippy</strong>
            {' '}
            button in the <strong>Tools</strong> menu to see possible improvements to your
            code.
          </p>

          <Example code={CLIPPY_EXAMPLE} />
        </LinkableSection>*/}

        {/*<LinkableSection id="features-miri" header="Checking code for undefined behavior" level="h3">
          <p>
            <a href={MIRI_URL}>Miri</a> is an interpreter for Rust’s mid-level intermediate
            representation (MIR) and can be used to detect certain kinds of undefined behavior
          in your unsafe Rust code. Click on the <strong>Miri</strong> button in
          the <strong>Tools</strong> menu to check.
          </p>

          <Example code={MIRI_EXAMPLE} />
        </LinkableSection>*/}

        <LinkableSection id="features-sharing" header="Sharing code" level="h3">
          <p>
            Once you have some code worth saving or sharing, click on the
            {' '}
            <strong>Share</strong> button. This will create a
            {' '}
            <a href={GIST_URL}>GitHub Gist</a>. You will also be provided with
            a URL to load that Gist back into the playground.
          </p>
        </LinkableSection>

        <LinkableSection id="features-linking" header="Linking to the playground with initial code" level="h3">
          <p>
            If you have a web page with Java code that you’d like to
            show in action, you can link to the playground with the
          Java code in the query parameter <Code>code</Code>. Make sure to
                                        escape any special characters. Keep the code short, as URLs have
                                        limitations on the maximum length.
          </p>
        </LinkableSection>

        {/*<LinkableSection id="features-tests" header="Executing tests" level="h3">
          <p>
            If your code contains the <Code>#[test]</Code> attribute and does not
          contain a <Code>main</Code> method, <Code>cargo test</Code> will be
          executed instead of <Code>cargo run</Code>.
          </p>

          <Example code={TEST_EXAMPLE} />
        </LinkableSection>*/}

        {/*<LinkableSection id="features-library" header="Compiling as a library" level="h3">
          <p>
            If your code contains the <Code>#![crate_type=&quot;lib&quot;]</Code> attribute,
            {' '}
            <Code>cargo build</Code> will be executed instead of <Code>cargo
          run</Code>.
          </p>

          <Example code={LIBRARY_EXAMPLE} />
        </LinkableSection>*/}

        {/*<LinkableSection id="features-output-formats" header="Output formats" level="h3">
          <p>
            Instead of executing the code, you can also see intermediate
            output of the compiler as x86_64 assembly, LLVM IR, Rust MIR, or
            WebAssembly. This is often used in conjunction with the
            {' '}
            <a href="#features-modes">mode</a> set to “Release” to see how the
            compiler has chosen to optimize some specific piece of code.
          </p>

          <Example code={OUTPUT_EXAMPLE} />
        </LinkableSection>*/}

        {/*<LinkableSection id="features-modes" header="Compilation modes" level="h3">
          <p>
            Rust has two primary compilation modes: <strong>Debug</strong> and
            {' '}
            <strong>Release</strong>. Debug compiles code faster while Release
            performs more aggressive optimizations.
          </p>

          <p>
            You can choose which mode to compile in using the <strong>Mode</strong>
            {' '}
            menu.
          </p>
        </LinkableSection>*/}

        {/*<LinkableSection id="features-channels" header="Rust channels" level="h3">
          <p>
            Rust releases new <strong>stable</strong> versions every 6
          weeks. Between these stable releases, <strong>beta</strong> versions of the
                                        next stable release are made available. In addition, builds containing
          experimental features are produced <strong>nightly</strong>.
          </p>

          <p>
            You can choose which runtime to compile with using the
            {' '}
            <strong>Runtime</strong> menu.
          </p>
        </LinkableSection>*/}

        <LinkableSection id="features-customization" header="Customization" level="h3">
          <p>
            The <a href={ACE_URL}>Ajax.org Cloud9 Editor (Ace)</a> is used to
            provide a better interface for editing code. Ace comes with
            several keybinding options (such as Emacs and Vim) as well as many
            themes.
          </p>

          <p>
            You may also disable Ace completely, falling back to a
            simple HTML text area.
          </p>

          <p>
            These options can be configured via the <strong>Config</strong> menu.
          </p>
        </LinkableSection>

        <LinkableSection id="features-persistence" header="Persistence" level="h3">
          <p>
            The most recently entered code will be automatically saved in your browser’s
            {' '}
            <a href={LOCALSTORAGE_URL}>local storage</a>. This allows you to recover
            your last work even if you close the browser.
          </p>

          <p>
            Local storage is a singleton resource, so if you use multiple windows,
            only the most recently saved code will be persisted.
          </p>
        </LinkableSection>
      </LinkableSection>

      <LinkableSection id="limitations" header="Limitations" level="h2">
        <p>
          To prevent the playground from being used to attack other computers and
          to ensure it is available for everyone to use, some limitations
          are enforced.
        </p>

        <dl>
          <dt>Network</dt>
          <dd>
            There is no network connection available during compilation or
            execution of user-submitted code.
          </dd>

          <dt>Memory</dt>
          <dd>
            The amount of memory the compiler and resulting executable use is
            limited.
          </dd>

          <dt>Execution Time</dt>
          <dd>
            The total compilation and execution time is limited.
          </dd>

          <dt>Disk</dt>
          <dd>
            The total disk space available to the compiler and resulting
            executable is limited.
          </dd>
        </dl>
      </LinkableSection>
    </section>
  );
};

const LinkableSection: React.FC<LinkableSectionProps> = ({
  id, header, level: Level, children,
}) => (
  <div id={id}>
    <Level>
      <span className={styles.header}>
        <a className={styles.headerLink} href={`#${id}`}>{header}</a>
      </span>
    </Level>
    {children}
  </div>
);

interface LinkableSectionProps {
  children: React.ReactNode;
  id: string;
  header: string;
  level: React.ElementType;
}

const Code: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <code className={styles.code}>{children}</code>
);

export default Help;
